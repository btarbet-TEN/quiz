import { readFile, rm, writeFile } from 'node:fs/promises';

const source = new URL('../public/index.html', import.meta.url);
const reviewPage = new URL('../public/review.html', import.meta.url);

if (process.env.VERCEL_ENV === 'preview') {
  const html = await readFile(source, 'utf8');
  await writeFile(reviewPage, html.replace('<body data-screen="intro">', '<body data-screen="intro" data-review-mode>'));
} else {
  await rm(reviewPage, { force: true });
}
