import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/postgres';

type UserAttributes = {
  id: number;
  username: string;
  password: string;
  active: boolean;
  role: string;
};

class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
{
    id!: number;
    username: string;
    password: string;
    active: boolean;
    role: string;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id'>;

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'user',
        createdAt: false,
        updatedAt: false,
        sequelize
    }
);

export default User;
