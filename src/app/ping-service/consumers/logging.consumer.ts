import {PingConsumer} from '../ping.consumer';
import {PingResponse} from 'ping';

export class LoggingConsumer implements PingConsumer {
    consume(response: PingResponse): void {
        const output = response.output;
        response.output = '';
        console.log(response);
        console.log('--');
        console.log(output);
    }
}
