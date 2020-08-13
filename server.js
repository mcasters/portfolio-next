/* eslint-disable no-undef */
const { resolve } = require('path');
const { createServer } = require('http');
const next = require('next');
const { parse } = require('url');
const finalhandler = require('finalhandler');
const serveStatic = require('serve-static');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const virtualLibrary = /\/images\//g;
const library = resolve(process.env.PHOTOS_PATH);
const staticServer = serveStatic(library, { index: false });

app.prepare().then(() => {
  createServer((req, res) => {
    const { url } = req;
    const parsedUrl = parse(url, true);

    if (url.match(virtualLibrary)) {
      req.url = url.replace(virtualLibrary, '');
      const done = finalhandler(req, res);
      staticServer(req, res, done);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(`${port}`, (err) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${port}`);
  });
});
