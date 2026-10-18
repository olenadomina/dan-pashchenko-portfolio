import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const outputPath = resolve(projectRoot, 'dist/index.html');
const rootMarker = '<div id="root"></div>';
const server = await createServer({
  root: projectRoot,
  logLevel: 'error',
  server: { middlewareMode: true, hmr: false, watch: null },
  appType: 'custom',
});

try {
  const template = await readFile(outputPath, 'utf8');
  if (!template.includes(rootMarker)) {
    throw new Error('The production HTML is missing its empty application root.');
  }

  const { default: App } = await server.ssrLoadModule('/src/App.jsx');
  // The regular page is readable before JavaScript; the client adds the WebGL badge.
  const content = renderToStaticMarkup(createElement(App, { renderBadge: false }));
  await writeFile(outputPath, template.replace(rootMarker, () => `<div id="root">${content}</div>`));
  console.log('Prerendered the visible portfolio into dist/index.html.');
} finally {
  await server.close();
}
