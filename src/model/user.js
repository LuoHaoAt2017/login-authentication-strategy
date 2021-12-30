import { Model, DataTypes, UUIDV4 } from "sequelize";

export class User extends Model {}

export default function(sequelize) {
  User.init({
    // attributes
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    githubId: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    // options
    sequelize: sequelize,
    createdAt: 'created_time',
    updatedAt: 'updated_time',
  });
  return User;
}