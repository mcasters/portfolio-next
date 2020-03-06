import cookie from 'cookie';
import jwt from 'jsonwebtoken';

import {User} from '../../models';
import config from '../../../../next.config';

const JWT_SECRET = config.jwt.secret;

const getAuthenticatedUser = async req => {
  const { token } = cookie.parse(req.headers.cookie ?? '');
  if (token) {
    const { username } = jwt.verify(token, JWT_SECRET);
    return User.findOne({where: {username}});
  }
  return false;
};

export default getAuthenticatedUser;
