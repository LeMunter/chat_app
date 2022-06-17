import * as jwt from 'jsonwebtoken';
import fs from 'fs';
import { TokenPayload } from '../types/token-payload';

export const createToken = async (payload: TokenPayload): Promise<string> => {
    const privateKey = await fs.promises.readFile('./private.pem', 'utf8');
    const signOptions: jwt.SignOptions = { algorithm: 'RS256', expiresIn: '4000h' };
    
    return jwt.sign(payload, privateKey, signOptions);
};
