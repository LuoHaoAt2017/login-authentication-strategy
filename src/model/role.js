import { Model, DataTypes, UUIDV4 } from "sequelize";

export class Role extends Model {
}

export default function(sequelize) {
  Role.init({
    // attributes
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: UUIDV4
    },
    rolename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    // options
    sequelize: sequelize,
    createdAt: 'created_time',
    updatedAt: 'updated_time',
  });
  return Role;
}
