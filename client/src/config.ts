const config = {
    BASE_URL:
        process.env.NODE_ENV && process.env.NODE_ENV === 'production'
            ? ''
            : 'http://localhost:5000/',
    SOCKET_PATH: '/socket.io',
};

export default config;
