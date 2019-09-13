import {PingConsumer} from './ping.consumer';
import {PingResponse} from 'ping';
import {tokens} from 'typed-inject';
import {OutputParser} from '../output-parser/output.parser';

export class DatabaseConsumer implements PingConsumer {

    public static inject = tokens('outputParser');
    constructor(private outputParser: OutputParser) {
    }

    consume(response: PingResponse): void {
        const parsedData = this.outputParser.parse(response);
        throw Error('-- Not implemented yet --');
    }
}
