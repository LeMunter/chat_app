type IConfig = {
    port: string;
}

export const config: IConfig = {
    port: process.env.NODE_PORT || '5000'
};
  