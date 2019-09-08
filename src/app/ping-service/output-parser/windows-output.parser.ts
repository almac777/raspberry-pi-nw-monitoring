import {OutputParser} from './output.parser';
import {PingResponse} from 'ping';
import {PingOutputParse} from './ping-output-parse';

export class WindowsOutputParser implements OutputParser {
    parse(response: PingResponse): PingOutputParse {
        throw Error('[ WindowsOutputParser ] not yet implemented')
    }

}
