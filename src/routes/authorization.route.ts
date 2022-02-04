import {NextFunction, Request, Response, Router} from 'express';
import JWT, {SignOptions} from "jsonwebtoken";
import {StatusCodes} from "http-status-codes";
import basicAuthenticationMiddleware from "../middlewares/basic-authentication.middleware";
import ForbiddenError from "../errors/forbidden.error.model";
import jwtAuthenticationMiddleware from "../middlewares/jwt-authentication.middleware";

const authorizationRoute = Router();
const secretKey = `${process.env['SECRET_KEY']}`;

authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response , next: NextFunction) => {
    try {
        const user = req.user;

        if (!user) {
            throw new ForbiddenError('Not user');
        }

        const jwtPayload = { username: user.username };
        const jwtOptions: SignOptions = { subject: user?.uuid, expiresIn: 1000 };

        const jwt = JWT.sign(jwtPayload, `${secretKey}`, jwtOptions);

        res.status(StatusCodes.OK).json({token: jwt});
    } catch (e) {
        next(e);
    }
});

authorizationRoute.post('/token/validate', jwtAuthenticationMiddleware, (req: Request, res: Response , next: NextFunction) => {
    res.sendStatus(StatusCodes.OK);
});

export default authorizationRoute;