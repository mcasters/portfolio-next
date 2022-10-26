import sequelize from './sequelize';
import User from './User';
import Painting from './Painting';
import Sculpture from './Sculpture';
import Drawing from './Drawing';
import Content from './Content';

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { User, Painting, Sculpture, Drawing, Content };