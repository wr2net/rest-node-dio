import {NextFunction, Request, Response, Router} from 'express';
import JWT from "jsonwebtoken";
import {StatusCodes} from "http-status-codes";
import basicAuthenticationMiddleware from "../middlewares/basic-authentication.middleware";
import ForbiddenError from "../errors/forbidden.error.model";

const authorizationRoute = Router();

authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response , next: NextFunction) => {
    try {
        const user = req.user;

        if (!user) {
            throw new ForbiddenError('Not user');
        }

        const jwtPayload = { username: user.username };
        const jwtOptions = { subject: user?.uuid };
        const secretKey = `${process.env['SECRET_KEY']}`;

        const jwt = JWT.sign(jwtPayload, `${secretKey}`, jwtOptions);

        res.status(StatusCodes.OK).json({token: jwt});
    } catch (e) {
        next(e);
    }
});

export default authorizationRoute;