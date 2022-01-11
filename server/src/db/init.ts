import Chatroom from '../models/chatroom';
import Conversation from '../models/conversation';
import Message from '../models/message';
import User from '../models/user';
import UserService from '../services/user-service';

const adminPW = process.env.ADMIN_PASS || 'password';

export const dbInit = async () => {
    await Chatroom.sync({ alter: false });
    await Conversation.sync({ alter: false });
    await Message.sync({ alter: false });
    await User.sync({ alter: false });
    
    const userService = new UserService();
    const admin = await User.findOne({ where: { username: 'admin' } });
    const user = await User.findOne({ where: { username: 'user' } });

    if(!admin) {
        await userService.create({ username: 'admin',
            password: adminPW,
            role: 'admin',
            active: true
        });
    }

    if (!user) {
        await userService.create({ username: 'user',
            password: 'password',
            role: 'user',
            active: true
        });
    }
};