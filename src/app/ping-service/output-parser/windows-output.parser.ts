import {OutputParser} from './output.parser';
import {PingResponse} from 'ping';
import {ParsedData} from './model/parsed-data';

export class WindowsOutputParser implements OutputParser {
    parse(response: PingResponse): ParsedData {
        throw Error('[ WindowsOutputParser ] not yet implemented')
    }

}
