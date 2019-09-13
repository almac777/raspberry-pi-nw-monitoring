import {PingConsumer} from './ping.consumer';
import {PingResponse} from 'ping';
import {OutputParser} from '../output-parser/output.parser';
import {tokens} from 'typed-inject';

export class LoggingConsumer implements PingConsumer {

    public static inject = tokens('outputParser');
    constructor(private outputParser: OutputParser) {
    }

    consume(response: PingResponse): void {
        const output = response.output;
        response.output = '';
        console.log(response);
        console.log('--');
        console.log(output);

        this.outputParser.parse(response);
    }
}
