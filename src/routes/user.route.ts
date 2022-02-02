import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const usersRoute = Router();

usersRoute.get('/users', (req: Request, res: Response , next: NextFunction) => {
    const users = [{userName: 'Wagner'}];
    res.status(StatusCodes.OK).send({users});
});

usersRoute.get('/user/:uuid', (req: Request<{ uuid: string }>, res: Response , next: NextFunction) => {
    const uuid = req.params.uuid
    res.status(StatusCodes.OK).send({uuid});
});

usersRoute.post('/user', (req: Request<{ uuid: string }>, res: Response , next: NextFunction) => {
    const newUser = req.body;
    res.status(StatusCodes.CREATED).send({newUser});
});

usersRoute.put('/user/:uuid', (req: Request<{ uuid: string }>, res: Response , next: NextFunction) => {
    const uuid = req.params.uuid
    const modifiedUser = req.body;

    modifiedUser.uuid = uuid;

    res.status(StatusCodes.OK).send({modifiedUser});
});

usersRoute.delete('/user/:uuid', (req: Request<{ uuid: string }>, res: Response , next: NextFunction) => {
    const uuid = req.params.uuid
    res.sendStatus(StatusCodes.OK);
});

export default usersRoute;