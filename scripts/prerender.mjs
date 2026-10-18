import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const rootMarker = '<div id="root"></div>';
const pages = [
  { path: 'dist/index.html', module: '/src/App.jsx', props: { renderBadge: false } },
  { path: 'dist/macos/index.html', module: '/src/macos/MacPortfolio.jsx', props: {} },
];
const server = await createServer({
  root: projectRoot,
  logLevel: 'error',
  server: { middlewareMode: true, hmr: false, watch: null },
  appType: 'custom',
});

try {
  for (const page of pages) {
    const outputPath = resolve(projectRoot, page.path);
    const template = await readFile(outputPath, 'utf8');
    if (!template.includes(rootMarker)) {
      throw new Error(`${page.path} is missing its empty application root.`);
    }

    const { default: Page } = await server.ssrLoadModule(page.module);
    // Both versions remain readable before JavaScript; the client adds interactions.
    const content = renderToStaticMarkup(createElement(Page, page.props));
    await writeFile(outputPath, template.replace(rootMarker, () => `<div id="root">${content}</div>`));
    console.log(`Prerendered the visible portfolio into ${page.path}.`);
  }
} finally {
  await server.close();
}
