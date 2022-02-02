import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const statusRoute = Router();

statusRoute.get('/status', (req: Request, res: Response , next: NextFunction) => {
    res.status(StatusCodes.OK).send({status: 200, message: 'It\'s working!'});
});

export default statusRoute;