// Pure scoring logic. No DOM access, so it runs in Node for unit tests.
//
// Rules (see CLAUDE.md):
// - Pillar score = sum of its 5 ratings (5–25).
// - Growth = lowest score; a valid user choice wins a tie; framework order supplies a fallback.
//   Any other pillar tied for lowest is "also worth your attention".
// - Foundation = highest score excluding the growth pillar; same tie-break.
// - All equal: use the chosen Growth Pillar if present, with no "also worth attention" list.

export const STATEMENTS_PER_PILLAR = 5;

/** Sum each pillar's ratings. `answers` maps slug -> array of five integers from 1–5. */
export function scorePillars(answers, slugs) {
  if (slugs.length < 2) throw new RangeError('At least two pillars are required');
  const scores = {};
  for (const slug of slugs) {
    if (!isPillarComplete(answers, slug)) throw new RangeError(`Invalid ratings for ${slug}`);
    scores[slug] = answers[slug].reduce((sum, rating) => sum + rating, 0);
  }
  return scores;
}

/** True when every statement for the pillar has a 1–5 rating. */
export function isPillarComplete(answers, slug) {
  const ratings = answers[slug] || [];
  if (!Array.isArray(ratings) || ratings.length !== STATEMENTS_PER_PILLAR) return false;
  return Array.from(ratings).every((r) => Number.isInteger(r) && r >= 1 && r <= 5);
}

/**
 * Pick growth / foundation pillars.
 * @param {Object<string, number>} scores slug -> score
 * @param {string[]} order slugs in framework order (tie-break order)
 * @param {string|null} growthChoice optional choice from the tied lowest pillars
 */
export function pickPillars(scores, order, growthChoice = null) {
  const lowest = Math.min(...order.map((slug) => scores[slug]));
  const growthOptions = order.filter((slug) => scores[slug] === lowest);
  const growthTied = growthOptions.length > 1;
  const growthChosen = growthTied && growthOptions.includes(growthChoice);
  const growth = growthChosen ? growthChoice : growthOptions[0];

  let foundation = null;
  for (const slug of order) {
    if (slug === growth) continue;
    if (foundation === null || scores[slug] > scores[foundation]) foundation = slug;
  }

  // When all five are equal there's no real "lowest", so nothing is flagged.
  const allEqual = order.every((slug) => scores[slug] === scores[order[0]]);

  // Other pillars tied for lowest (never the foundation pillar).
  const alsoAttention = allEqual ? [] : order.filter(
    (slug) => slug !== growth && slug !== foundation && scores[slug] === scores[growth],
  );

  const foundationPeers = order.filter((slug) => slug !== growth && slug !== foundation && scores[slug] === scores[foundation]);
  const foundationTied = foundationPeers.length > 0;

  return { growth, foundation, alsoAttention, allEqual, growthOptions, growthTied, growthChosen, foundationTied, foundationPeers };
}

/** Convenience: answers -> full results object. */
export function computeResults(answers, order, growthChoice = null) {
  const scores = scorePillars(answers, order);
  return { scores, ...pickPillars(scores, order, growthChoice) };
}
