// Flodesk collects signup details. Only its visible success state confirms a lead.
import { CONFIG, isPlaceholder } from './config.js';
import { loadFlodesk } from './flodesk-loader.js';

/**
 * Form ID for a pillar's growth form, or null if it's missing or still a placeholder.
 * No fallback to another pillar's form: that would silently put people in the wrong
 * segment and workflow. A missing ID logs an error and the gate shows its fallback.
 */
export function formIdFor(slug, forms = CONFIG.flodesk.forms) {
  const id = forms[slug];
  if (!isPlaceholder(id)) return id;
  console.error(`[gate] No Flodesk form ID configured for "${slug}" (config.flodesk.forms). Showing the fallback instead of the form.`);
  return null;
}

function isVisible(el) {
  if (!el || !el.isConnected) return false;
  const style = window.getComputedStyle(el);
  if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return false;
  const rect = el.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

// Flodesk may render into an open shadow root; search both.
function queryAllDeep(root, selector) {
  const found = [...root.querySelectorAll(selector)];
  root.querySelectorAll('*').forEach((el) => {
    if (el.shadowRoot) found.push(...queryAllDeep(el.shadowRoot, selector));
  });
  return found;
}

function hasSuccessState(container) {
  return queryAllDeep(container, '[data-ff-stage="success"], [data-ff-el="success"]').some(isVisible);
}

// Copy only a recognized name field. The value is used in memory for the PDF.
function findNameField(container) {
  const fields = queryAllDeep(container, 'input[type="text"]').filter(isVisible);
  const matches = (field, token, pattern) =>
    field.autocomplete.split(/\s+/).includes(token) ||
    pattern.test(field.name) ||
    [...field.labels].some((label) => pattern.test(label.innerText.trim()));
  const firstName = fields.find((field) => matches(field, 'given-name', /^(first[-_ ]?name|name_first)$/i));
  return firstName || fields.find((field) => matches(field, 'name', /^(name|full[-_ ]?name)$/i));
}

function hasRenderedForm(container) {
  return queryAllDeep(container, 'form, input[type="email"]').length > 0;
}

/**
 * Mount the gate form.
 * @param {HTMLElement} host element to render the form container into
 * @param {string} growthSlug
 * @param {{onSuccess: (info: {firstName: string}) => void, onBlocked: () => void, onRendered?: () => void, onPending?: () => void, onUnconfirmed?: () => void}} handlers
 * @returns {() => void} cleanup
 */
export function mountGateForm(host, growthSlug, { onSuccess, onBlocked, onRendered = () => {}, onPending = () => {}, onUnconfirmed = () => {} }) {
  const formId = formIdFor(growthSlug);
  if (!formId) {
    host.innerHTML = '';
    onBlocked();
    return () => {};
  }
  const containerId = `fd-form-${formId}`;
  host.innerHTML = '';
  const container = document.createElement('div');
  container.id = containerId;
  container.className = 'fd-container';
  host.appendChild(container);

  let done = false;
  let rendered = false;
  let submitted = false;
  let submitTimer = null;
  let firstName = '';
  let nameField;
  const captureName = () => {
    if (!nameField?.isConnected) nameField = findNameField(container);
    if (nameField) firstName = nameField.value.replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, 80);
  };
  const timers = [];

  const finish = () => {
    if (done) return;
    done = true;
    cleanup();
    onSuccess({ firstName });
  };

  const checkForm = () => {
    if (done) return;
    if (!rendered && hasRenderedForm(container)) { rendered = true; onRendered(); }
    if (hasSuccessState(container)) { finish(); return; }
    if (submitted && submitTimer !== null &&
      queryAllDeep(container, '[data-ff-stage="error"], [aria-invalid="true"]').some(isVisible)) {
      clearTimeout(submitTimer);
      submitTimer = null;
      onUnconfirmed();
    }
  };
  const observer = new MutationObserver(checkForm);
  observer.observe(container, { subtree: true, childList: true, attributes: true });
  // Open shadow roots may update without notifying the container observer.
  const poll = setInterval(checkForm, 250);

  const beginSubmission = (form) => {
    if (!form || (!container.contains(form) && !queryAllDeep(container, 'form').includes(form))) return;
    if (!form.checkValidity()) return;
    submitted = true;
    onPending();
    // Read now: Flodesk may clear the fields once it shows its success state.
    captureName();
    clearTimeout(submitTimer);
    submitTimer = setTimeout(() => {
      submitTimer = null;
      if (!done) onUnconfirmed();
    }, CONFIG.flodesk.confirmationTimeoutMs);
  };
  // The hosted form can handle a submit-button click without emitting a native submit.
  const onSubmit = (event) => beginSubmission(event.target);
  const onClick = (event) => {
    const button = event.composedPath().find((node) => node.matches?.('button[type="submit"], input[type="submit"]'));
    if (button) beginSubmission(button.form);
  };
  const onKeyDown = (event) => {
    if (event.key !== 'Enter' || event.isComposing) return;
    const field = event.composedPath().find((node) => node.matches?.('input'));
    if (field) beginSubmission(field.form);
  };
  container.addEventListener('input', captureName, true);
  container.addEventListener('submit', onSubmit, true);
  container.addEventListener('click', onClick, true);
  container.addEventListener('keydown', onKeyDown, true);

  // Render timeout: if nothing rendered, offer a way through.
  timers.push(setTimeout(() => {
    if (!done && !rendered && !hasRenderedForm(container)) onBlocked();
  }, CONFIG.flodesk.renderTimeoutMs));

  function cleanup() {
    done = true;
    observer.disconnect();
    clearInterval(poll);
    container.removeEventListener('input', captureName, true);
    container.removeEventListener('submit', onSubmit, true);
    container.removeEventListener('click', onClick, true);
    container.removeEventListener('keydown', onKeyDown, true);
    clearTimeout(submitTimer);
    timers.forEach(clearTimeout);
  }

  try {
    // First gate view loads Flodesk; later views
    // reuse it. window.fd queues the call until Flodesk's script is ready.
    loadFlodesk();
    if (typeof window.fd !== 'function') throw new Error('Flodesk script not available');
    window.fd('form', { formId, containerEl: `#${containerId}` });
  } catch (e) {
    console.warn('[gate] Could not initialize the Flodesk form:', e);
    // Leave the render timeout to show the fallback (it will, since nothing rendered).
  }

  return cleanup;
}
