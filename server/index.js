const path = require('path');
const express = require('express');
const next = require('next');
const session = require('express-session');

const config = require('../next.config');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use('/images', express.static(path.resolve(config.libraryPath)));

  server.use(
      session({
        name: config.auth.jwt.name,
        secret: config.auth.jwt.secret,
        resave: true,
        saveUninitialized: true,
        cookie: {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 1000 * 60 * 60 * 24, // 1 days
        },
      }),
  );

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
