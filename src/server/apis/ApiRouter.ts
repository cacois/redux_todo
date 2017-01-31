import * as express from 'express';
import {AuthRouter} from './AuthRouter';
import {TodoRouter} from './TodoRouter';

export class ApiRouter {
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.init();
    }

    init() {
        this.router.use('/auth', (new AuthRouter()).router);
        this.router.use('/todo', (new TodoRouter()).router);
    }
}
