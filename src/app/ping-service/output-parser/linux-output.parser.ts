import {OutputParser} from './output.parser';
import {PingResponse} from 'ping';
import {ParsedData} from './model/parsed-data';
// @ts-ignore
import * as R from 'ramda';

export class LinuxOutputParser implements OutputParser {

    private static LATENCY_REGEX = /(\d+.\d+)\sms/;
    private static MATCH_INDEX = 1;
    private static MATCH_ARRAY_MINIMUM_LENGTH = 2;

    parse(response: PingResponse): ParsedData {
        const pingOutputParse = new ParsedData();
        // Can't use Ramda TS here, because compose only accepts up to 6 invocations
        R.compose(
            R.map((datapoint: number) => pingOutputParse.datapoints.push(datapoint)),
            R.map((datapoint: string) => Number(datapoint)),
            R.map((arr: Array<string>) => arr[LinuxOutputParser.MATCH_INDEX]),
            R.filter((arr: Array<string>) => arr.length >= LinuxOutputParser.MATCH_ARRAY_MINIMUM_LENGTH),
            R.filter((arr: Array<string>) => arr),
            R.map((line: string) => line.match(LinuxOutputParser.LATENCY_REGEX) as Array<string>),
            (output: string) => output.split('\n'),
            R.pathOr('', ['output'])
        )(response);
        return pingOutputParse;
    }

}
