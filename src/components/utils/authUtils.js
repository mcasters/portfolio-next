/*eslint-disable no-undef*/
import bcrypt from 'bcryptjs';

export const isAuth = async (req) => {
  return !!req.session.user;
};

export const createUser = (data) => {
  const salt = bcrypt.genSaltSync();

  return {
    username: data.username,
    email: data.email,
    password: bcrypt.hashSync(data.password, salt),
  };
};

export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};
