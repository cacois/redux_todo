import * as express from 'express';
import {AuthRouter} from './AuthRouter';

export class ApiRouter {
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.init();
    }

    init() {
        this.router.use('/auth', (new AuthRouter()).router);
    }
}
