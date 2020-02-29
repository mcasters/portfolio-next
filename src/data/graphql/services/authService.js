import { User } from '../../models';

const getAuthenticatedUser = async req => {
  if (!req.session.userId) return false;

  const user = await User.findOne({
    where: { id: req.session.userId },
  });

  return !!user;
};

export default getAuthenticatedUser;
