import cookie from 'cookie';
import jwt from 'jsonwebtoken';

import { User } from '../models';

const JWT_SECRET = process.env.JWT_SECRET;

const isAuthenticated = async req => {
  const { token } = cookie.parse(req.headers.cookie ?? '');
  if (token) {
    const { username } = jwt.verify(token, JWT_SECRET);
    return !!User.findOne({ where: { username } });
  }
  return false;
};

export default isAuthenticated;
