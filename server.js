/* eslint-disable no-undef */
const { join } = require('path');
const { createServer } = require('https');
const next = require('next');
const { parse } = require('url');
const { readFileSync } = require('fs');

const port = parseInt(process.env.PORT, 10) || 3001;
const dev = process.env.NODE_ENV !== 'production';
console.log('///// env : ' + process.env.NODE_ENV);
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: readFileSync('./certificates/localhost.key'),
  cert: readFileSync('./certificates/localhost.crt'),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    // Middleware
    //server.use('/images', express.static(path.resolve(process.env.PHOTOS_PATH)));

    if (pathname === '/service-worker.js') {
      const filePath = join(__dirname, '.next', pathname);
      app.serveStatic(req, res, filePath);
      // } else if (pathname === '/images/drawings/md/dessin.jpg') {
      //   console.log('coucou ////////');
      //   const library = path.resolve(process.env.PHOTOS_PATH);
      //   const filePath = `${library}/drawings/md/dessin.jpg`
      //   console.log('filepath //////// : ' + filePath);
      //   app.serveStatic(req, res, filePath);
      // } else if (pathname === '/b') {
      //   app.render(req, res, '/', query);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(`${port}`, (err) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`> Ready on https://localhost:${port}`);
  });
});
