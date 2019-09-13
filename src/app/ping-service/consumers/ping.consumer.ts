import {PingResponse} from 'ping';
import {tokens} from 'typed-inject';
import {OutputParser} from '../output-parser/output.parser';

export interface PingConsumer {
    consume(response: PingResponse): void;
}
