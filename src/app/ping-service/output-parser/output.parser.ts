import {PingResponse} from 'ping';
import {PingOutputParse} from './ping-output-parse';

export interface OutputParser {
    parse(response: PingResponse): PingOutputParse;
}

