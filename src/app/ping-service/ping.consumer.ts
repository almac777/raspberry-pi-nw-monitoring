import {PingResponse} from 'ping';

export interface PingConsumer {
    consume(response: PingResponse): void;
}
