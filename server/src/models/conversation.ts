import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/postgres';

type ConversationAttributes = {
  id: number;
  user_ids: number[];
  message_ids: number[]
};

class Conversation
    extends Model<ConversationAttributes, ConversationCreationAttributes>
    implements ConversationAttributes
{
    id!: number;
    user_ids: number[];
    message_ids: number[];
}

export type ConversationCreationAttributes = Optional<ConversationAttributes, 'id'>;

Conversation.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_ids: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: false
        },
        message_ids: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: true
        }
    },
    {
        tableName: 'conversation',
        createdAt: false,
        updatedAt: false,
        sequelize
    }
);

export default Conversation;
