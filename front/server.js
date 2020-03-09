const express = require('express');
const path = require('path');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');

const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';

const app = next({ dev });
const handle = app.getRequestHandler();
dotenv.config();

app.prepare().then(() => {
  const server = express();

  server.use(morgan('dev'));
  server.use('/', express.static(path.join(__dirname, 'public')));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieParser(process.env.COOKIE_SECRET));
  server.use(
    expressSession({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
        secure: false,
      },
    }),
  );

  server.get('/user/:id', (req, res) => {
    return app.render(req, res, '/user', { id: req.params.id });
  });

  server.get('/p/:id', (req, res) => {
    return app.render(req, res, '/p', {
      id: req.params.id,
      name: req.params.name,
    });
  });

  server.get('/post/:id', (req, res) => {
    return app.render(req, res, '/post', { id: req.params.id });
  });

  server.get('/profile/:nickname', (req, res) => {
    return app.render(req, res, '/profile', { nickname: req.params.nickname });
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(prod ? process.env.PORT : 3000, () => {
    console.log(
      `next+express running on port ${prod ? process.env.PORT : 3000}`,
    );
  });
});
