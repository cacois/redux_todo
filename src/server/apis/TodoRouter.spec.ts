import {Server} from '../Server';
import {TodoItem, TodoService} from '../services/TodoService';
import express = require('express');
import supertest = require('supertest');

function setup() {
    let port = 4000;
    let server = new Server(express(), port);
    return {
        request: require('supertest')(server.app)
    };
}

let todoItem: TodoItem = {
    id: null,
    title: 'test',
    description: 'test',
    isComplete: false
};

describe('Todo API', () => {
    it('Should respond to GET /', () => {
        TodoService.getAll = jest.fn();
        (<jest.Mock<TodoItem[]>>TodoService.getAll).mockImplementation((): TodoItem[] => {
            return [];
        });

        return new Promise((resolve: Function, reject: Function) => {
            const {request} = setup();
            return request
                .get('/api/todo')
                .expect(200)
                .expect('Content-Type', /json/)
                .expect([])
                .end((err: any, res: express.Response) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
        });
    });

    it('Should return HTTP/404 when getting an invalid id', () => {
        TodoService.get = jest.fn();
        (<jest.Mock<TodoItem>>TodoService.get).mockImplementation((_): TodoItem => {
            return null;
        });

        return new Promise((resolve: Function, reject: Function) => {
            const {request} = setup();
            return request
                .get('/api/todo/1')
                .expect(404)
                .end((err: any, res: express.Response) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
        });
    });

    it('Should return an item when getting a valid id', () => {
        TodoService.get = jest.fn();
        (<jest.Mock<TodoItem>>TodoService.get).mockImplementation((_): TodoItem => {
            return todoItem;
        });

        return new Promise((resolve: Function, reject: Function) => {
            const {request} = setup();
            return request
                .get('/api/todo/0')
                .expect(200)
                .expect('Content-Type', /json/)
                .expect({
                    id: null,
                    title: 'test',
                    description: 'test',
                    isComplete: false
                })
                .end((err: any, res: express.Response) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
        });
    });

    it('Should return an id when inserting', () => {
        TodoService.insert = jest.fn();
        (<jest.Mock<number>>TodoService.insert).mockImplementation((_): number => {
            return 0;
        });

        return new Promise((resolve: Function, reject: Function) => {
            const {request} = setup();
            return request
                .post('/api/todo')
                .send(todoItem)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect({id: 0})
                .end((err: any, res: express.Response) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
        });
    });

    it('Should return HTTP/200 when updating', () => {
        TodoService.update = jest.fn();

        return new Promise((resolve: Function, reject: Function) => {
            const {request} = setup();
            return request
                .put('/api/todo/0')
                .send(todoItem)
                .expect(200)
                .end((err: any, res: express.Response) => {
                    if (err) {
                        reject(err);
                    } else {
                        expect(TodoService.update).toBeCalled();
                        resolve(res);
                    }
                });
        });
    });

    it('Should return HTTP/200 when deleting', () => {
        TodoService.delete = jest.fn();

        return new Promise((resolve: Function, reject: Function) => {
            const {request} = setup();
            return request
                .delete('/api/todo/0')
                .expect(200)
                .end((err: any, res: express.Response) => {
                    if (err) {
                        reject(err);
                    } else {
                        expect(TodoService.delete).toBeCalled();
                        resolve(res);
                    }
                });
        });
    });
});
