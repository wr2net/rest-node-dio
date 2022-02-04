import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";

async function basicAuthenticationMiddleware (req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader) {
            throw new ForbiddenError('Not Authorized');
        }

        const [authenticationType, token] = authorizationHeader.split(' ');

        if (authenticationType !== 'Basic' || !token) {
            throw new ForbiddenError('Invalid authentication');
        }

        const tokenContent = Buffer.from(token, 'base64').toString('utf-8');

        const [username, password] = tokenContent.split(':');

        if (!username || !password) {
            throw new ForbiddenError('Empty Credentials');
        }

        const user = await userRepository.findByUsernameAndPassword(username, password);

        req.user = user;
        next();
    } catch (e) {
        next(e);
    }
}

export default basicAuthenticationMiddleware;