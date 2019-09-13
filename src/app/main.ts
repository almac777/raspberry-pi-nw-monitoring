// lib/app.ts
import express = require('express');
import {rootInjector, tokens} from 'typed-inject';
import {PingController} from './ping-service/ping.controller';
import {PingService} from './ping-service/ping.service';
import {DatabaseConsumer} from './ping-service/consumers/database.consumer';
import {LoggingConsumer} from './ping-service/consumers/logging.consumer';
import {PingConsumer} from './ping-service/consumers/ping.consumer';
import {PingServiceConfig} from './ping-service/ping.service.config';
import {OutputParser} from './ping-service/output-parser/output.parser';
import {LinuxOutputParser} from './ping-service/output-parser/linux-output.parser';
import {WindowsOutputParser} from './ping-service/output-parser/windows-output.parser';
const os = require('os');

// Create a new express application instance
const main: express.Application = express();

main.get('/', function (req, res) {
    res.send('Hello World!');
});

main.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

const env = process.env.NODE_ENV || null;
console.debug(`Env: ${env} - running on ${os.platform()}`);

function outputParserFactory(os: string): OutputParser {
    let outputParser: (new() => OutputParser);
    if (os === 'linux' || os === 'darwin') {
        outputParser = LinuxOutputParser;
    } else {
        outputParser = WindowsOutputParser;
    }
    return new outputParser();
}
outputParserFactory.inject = tokens('os');

function pingConsumerFactory(os: string, outputParser: OutputParser): PingConsumer {
    let consumer: PingConsumer;
    consumer = new LoggingConsumer(outputParser);
    if (env) {
        switch (env) {
            case 'dev':
            case 'prod':
                consumer = new DatabaseConsumer(outputParser);
                break;
            default:
                consumer = new LoggingConsumer(outputParser);
                break;
        }
    }
    return consumer;
}
pingConsumerFactory.inject = tokens('os', 'outputParser');

const injector = rootInjector
    .provideValue('app', main)
    .provideValue('os', os.platform())
    .provideClass('config', PingServiceConfig)
    .provideFactory('outputParser', outputParserFactory)
    .provideFactory('consumer', pingConsumerFactory);

// Initiate all classes that require an injector
const typesToInject = [ PingController ];

typesToInject.forEach(type => {
    injector.injectClass(type);
});

const service: PingService = injector.injectClass(PingService);
service.start();
