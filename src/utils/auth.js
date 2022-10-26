import { serialize, parse } from 'cookie';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { User } from '../data/models';

const JWT_SECRET = process.env.JWT_SECRET;

export const isAuthenticated = async (req) => {
  const { token } = parse(req.headers.cookie ?? '');
  if (token) {
    const { username } = jwt.verify(token, JWT_SECRET);
    return !!(await User.findOne({ where: { username } }));
  }
  return false;
};

export const setCookie = (res, user) => {
  const token = jwt.sign(
      { username: user.username, id: user.id, time: new Date() },
      JWT_SECRET,
      {
        expiresIn: '6h',
      },
  );

  const expires = new Date(new Date().getTime() + 60 * 60 * 6);

  res.setHeader(
    'Set-Cookie',
    serialize('token', token, {
      httpOnly: true,
      expires,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    }),
  );
};

export const createUser = (data) => {
  const salt = bcrypt.genSaltSync();

  return {
    username: data.username,
    email: data.email,
    password: bcrypt.hashSync(data.password, salt),
  };
};

export const validPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};