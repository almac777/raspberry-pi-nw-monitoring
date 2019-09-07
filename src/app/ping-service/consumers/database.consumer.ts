import {PingConsumer} from '../ping.consumer';
import {PingResponse} from 'ping';

export class DatabaseConsumer implements PingConsumer {
    consume(response: PingResponse): void {
        throw Error('-- Not implemented yet --');
    }
}
