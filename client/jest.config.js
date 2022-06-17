/* eslint-disable */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    roots: ['<rootDir>/src'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['<rootDir>/src/setupTests.ts'],
    //alias list to integrate swiftly nested directories
    //this can be skipped if not needed
    moduleNameMapper: {
        '^@constants(.*)$': '<rootDir>/ts/constants',
        '^@containers(.*)$': '<rootDir>/ts/containers',
        '^@store(.*)$': '<rootDir>/ts/store',
         //identity-obj-proxy to integrate styles/images etc.
         //this can be skipped if not needed
        '\\.(css|less|scss|jpg|jpeg|png)$': 'identity-obj-proxy'
    }
};
