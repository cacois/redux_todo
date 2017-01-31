import * as express from 'express';
import {TodoService, TodoItem} from '../services/TodoService';

export class TodoRouter {
    router: express.Router;

    private static getAll(req: express.Request, res: express.Response, next: express.NextFunction) {
        res.send(TodoService.getAll()).end();
    }

    private static get(req: express.Request, res: express.Response, next: express.NextFunction) {
        let item = TodoService.get(req.params.id);
        if (item === null) {
            res.sendStatus(404);
        } else {
            res.send(item).end();
        }
    }

    private static put(req: express.Request, res: express.Response, next: express.NextFunction) {
        let item = <TodoItem>req.body;
        item.id = req.params.id;
        res.send(TodoService.update(item)).end();
    }

    private static post(req: express.Request, res: express.Response, next: express.NextFunction) {
        res.send({id: TodoService.insert(<TodoItem>req.body)}).end();
    }

    private static delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        res.send(TodoService.delete(req.params.id)).end();
    }

    constructor() {
        this.router = express.Router();
        this.init();
    }

    init() {
        this.router.get('/', TodoRouter.getAll);
        this.router.get('/:id', TodoRouter.get);
        this.router.put('/:id', TodoRouter.put);
        this.router.post('/', TodoRouter.post);
        this.router.delete('/:id', TodoRouter.delete);
    }
}
