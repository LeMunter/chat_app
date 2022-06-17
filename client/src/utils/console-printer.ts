/* eslint-disable no-console */
/**
 * Only prints to console if NODE_ENV is not production!
 * Handy for debug console.logs!
 */
export const printToConsole = (message: string): void => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(message);
    }
};
