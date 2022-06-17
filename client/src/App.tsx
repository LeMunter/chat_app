import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { useContext } from 'react';
import AdminPanel from './pages/AdminPanel';
import Home from './pages/Home';
import Login from './components/Login';
import Chatroom from './components/Chatroom';
import Private from './components/routes/Private';
import Public from './components/routes/Public';
import ROLE from './types/Role';
import UserCreation from './components/UserCreation';
import { AuthContext } from './context/AuthProvider';

function App(): JSX.Element {
    const { user } = useContext(AuthContext);

    return (
        <div className="App bg-gray-800">
            {user?.role === ROLE.ADMIN && (
                <header className="white">
                    <nav className="pb-4 border-b-2 border-fuchsia-600 space-x-2 text-center bg-white">
                        <Link className="no-underline hover:underline" to="/">
                            Home
                        </Link>
                        <Link
                            className="no-underline hover:underline"
                            to="/admin"
                        >
                            Admin
                        </Link>

                        <Link
                            className="no-underline hover:underline"
                            to="/create-chatroom"
                        >
                            Create Chatroom
                        </Link>

                        <Link
                            className="no-underline hover:underline"
                            to="/create-user"
                        >
                            Create user
                        </Link>
                    </nav>
                </header>
            )}

            <main className="container mx-auto">
                <Routes>
                    <Route
                        path="login"
                        element={<Public component={Login} />}
                    />
                    <Route
                        path="create-chatroom"
                        element={
                            <Private
                                roles={[ROLE.ADMIN]}
                                component={() => (
                                    <Chatroom
                                        chatroom={undefined}
                                        updateModal={() => {}}
                                    />
                                )}
                            />
                        }
                    />
                    <Route
                        path="create-user"
                        element={
                            <Private
                                roles={[ROLE.ADMIN]}
                                component={UserCreation}
                            />
                        }
                    />
                    <Route
                        path="admin"
                        element={
                            <Private
                                roles={[ROLE.ADMIN]}
                                component={AdminPanel}
                            />
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <Private
                                roles={[ROLE.ADMIN, ROLE.USER, ROLE.MOD]}
                                component={Home}
                            />
                        }
                    />
                </Routes>
            </main>
        </div>
    );
}

export default App;
