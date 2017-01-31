import {Server} from '../Server';
import express = require('express');
import supertest = require('supertest');
import {AuthService, UserCredential} from '../services/AuthService';

function setup() {
    AuthService.authenticate = jest.fn();
    (<jest.Mock<void>>AuthService.authenticate).mockImplementation((userCredential:UserCredential) => {
        if (userCredential.username === 'mock' && userCredential.password === 'mock') {
            return '1';
        } else {
            return null;
        }
    });

    let port = 4000;
    let server = new Server(express(), port);
    return {
        request: require('supertest')(server.app)
    };
}

let validCred = {'username': 'mock', 'password': 'mock'};
let invalidCred = {'username': 'test', 'password': 'test2'};

describe('Auth API', () => {
    it('Should return HTTP/200 for a valid credential', () => {
        return new Promise((resolve: Function, reject: Function) => {
            const {request} = setup();
            return request
                .post('/api/auth')
                .send(validCred)
                .expect(200)
                .end((err: any, res: express.Response) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
        });
    });

    it('Should set a token for a valid credential', () => {
        return new Promise((resolve: Function, reject: Function) => {
            const {request} = setup();
            return request
                .post('/api/auth')
                .send(validCred)
                .expect(200)
                .expect((res: express.Response) => {
                    if (!res.header['token'] || res.header['token'].length === 0) throw 'Token missing';
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

    it('Should return HTTP/401 for an invalid credential', () => {
        return new Promise((resolve: Function, reject: Function) => {
            const {request} = setup();
            return request
                .post('/api/auth')
                .send(invalidCred)
                .expect(401)
                .end((err: any, res: express.Response) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
        });
    });
});
