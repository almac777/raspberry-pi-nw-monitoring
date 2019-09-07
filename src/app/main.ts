// lib/app.ts
import express = require('express');
import {rootInjector} from 'typed-inject';
import {PingController} from './ping-service/ping.controller';
import {PingService} from './ping-service/ping.service';
import {PingConfig} from 'ping';
import {DatabaseConsumer} from './ping-service/consumers/database.consumer';
import {LoggingConsumer} from './ping-service/consumers/logging.consumer';
import {PingConsumer} from './ping-service/ping.consumer';
import {PingServiceConfig} from './ping-service/ping.service.config';

// Create a new express application instance
const main: express.Application = express();

main.get('/', function (req, res) {
    res.send('Hello World!');
});

main.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

const env = process.env.NODE_ENV || null;
console.debug(`Env: ${env}`);
let consumer: PingConsumer;
consumer = new LoggingConsumer();
if (env) {
    switch (env) {
        case 'dev':
        case 'prod':
            consumer = new DatabaseConsumer();
            break;
        default:
            consumer = new LoggingConsumer();
            break;
    }
}

const injector = rootInjector
    .provideValue('app', main)
    .provideValue('config', new PingServiceConfig())
    .provideValue('consumer', consumer);

const typesToInject = [ PingController ];

typesToInject.forEach(type => {
    injector.injectClass(type);
});

const service: PingService = injector.injectClass(PingService);
service.start();
