import jwt from 'jsonwebtoken';
import config from '../config';

const generateToken = (user) => jwt.sign({sub: user.id, iat: new Date().getTime()}, config.secret);

export default function (user) {
    return generateToken(user);
}
