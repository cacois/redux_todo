import * as express from 'express';
import {AuthService, UserCredential} from '../services/AuthService';

export class AuthRouter {
    router: express.Router;

    private static post(req: express.Request, res: express.Response, next: express.NextFunction) {
        let token = AuthService.authenticate(<UserCredential>req.body);
        if(token) {
            res.set('Authentication', token);
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }
    }

    constructor() {
        this.router = express.Router();
        this.init();
    }

    init() {
        this.router.post('/', AuthRouter.post);
    }
}
