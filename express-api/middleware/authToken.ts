import jwt from 'jsonwebtoken';
import fs  from 'fs';
import { loadConfig } from '../config';

const { accessTokenSecret } = loadConfig();

function authToken(req, res, next) {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) return res.status(401).send('Access Denied');

    const tokens = authHeader.split(' ');
    const token = tokens[1];

    try {
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) res.status(403).send('Invalid token');
            req.user = user;
            next();
        });
    } catch (ex) {
        res.status(400).send('Invalid token');
    }
}

export default authToken;