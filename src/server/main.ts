import express = require('express');
import {Server} from './Server';

let port = 4000;
let server = new Server(express(), port);
server.run();
console.info(`listening on ${port}`);
