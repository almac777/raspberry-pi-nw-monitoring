import {PingResponse} from 'ping';
import {ParsedData} from './model/parsed-data';

export interface OutputParser {
    parse(response: PingResponse): ParsedData;
}

