import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../errors/forbidden.error.model";
import JWT from "jsonwebtoken";
import userRepository from "../repositories/user.repository";

const secretKey = `${process.env['SECRET_KEY']}`;

async function jwtAuthenticationMiddleware (req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader) {
            throw new ForbiddenError('Not Authorized');
        }

        const [authenticationType, token] = authorizationHeader.split(' ');

        if (authenticationType !== 'Bearer' || !token) {
            throw new ForbiddenError('Invalid authentication');
        }

        try {
            const tokenPayload = JWT.verify(token, `${secretKey}`);

            if (typeof tokenPayload !== `object` || !tokenPayload.sub){
                throw new ForbiddenError('Invalid authentication');
            }

            const user = {
                uuid: tokenPayload.sub,
                username: tokenPayload.username
            };

            req.user = user;
            next();
        } catch (e) {
            throw new ForbiddenError('Invalid authentication');
        }
    } catch (e) {
        next(e);
    }
}

export default jwtAuthenticationMiddleware;