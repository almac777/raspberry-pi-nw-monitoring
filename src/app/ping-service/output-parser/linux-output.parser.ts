import {OutputParser} from './output.parser';
import {PingResponse} from 'ping';
import {PingOutputParse} from './ping-output-parse';

export class LinuxOutputParser implements OutputParser {
    parse(response: PingResponse): PingOutputParse {
        const pingOutputParse = new PingOutputParse();
        response.output.split('\n').forEach(line => {
            const regexpMatch = line.match(/(\d+.\d+)\sms/);
            if (! regexpMatch) {
                return;
            }
            regexpMatch.forEach((val, number) => {
                if (number === 1) {
                    pingOutputParse.datapoints.push(Number(val));
                }
            });
        });
        return pingOutputParse;
    }

}
