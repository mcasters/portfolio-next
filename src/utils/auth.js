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

export const setCookie = (res, name, value) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);

  const expires = new Date(new Date().getTime() + 60 * 60 * 6);

  res.setHeader(
    'Set-Cookie',
    serialize(name, stringValue, {
      httpOnly: true,
      expires,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    }),
  );

  /*
        if (user && validPassword(user, signInInput.password)) {
        const token = jwt.sign(
          { username: user.username, id: user.id, time: new Date() },
          JWT_SECRET,
          {
            expiresIn: '6h',
          },
        );
   */
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