import { useContext } from 'react';
import Chat from '../components/Chatroom/Chat';
import { AuthContext } from '../context/AuthProvider';
import SideBar from '../components/sidebar/SideBar';
import { HomeProvider } from '../context/HomeProvider';
import { SocketProvider } from '../context/SocketProvider';
import Logout from '../components/Logout';
import RenderChat from '../components/RenderChat';

const Home: React.FC = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <HomeProvider>
            <SocketProvider>
                <div className="flex flex-row flex-wrap py-4">
                    <SideBar />
                    <div className="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
                        <div className="flex-1 bg-gray-500">
                            <div className="text-right">
                                <span className="inline-block">
                                    <Logout />
                                    <span className="inline-block align-text-bottom" />
                                </span>
                                <span className="inline-block ml-10 text-gray-700 hover:text-gray-900 align-bottom" />
                                <RenderChat />
                            </div>
                        </div>
                    </div>
                </div>
            </SocketProvider>
        </HomeProvider>
    );
};

export default Home;
