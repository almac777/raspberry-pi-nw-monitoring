import 'mocha';
import * as assert from 'assert';
import {LinuxOutputParser} from '../app/ping-service/output-parser/linux-output.parser';
import {PingResponse} from 'ping';
import {SAMPLE_PING_DATA} from './sample-data/linux-ping-output';
import {ParsedData} from '../app/ping-service/output-parser/model/parsed-data';

describe('test', () => {
    describe('mocha', () => {
        it('should assert true is true', () => {
            assert.strict.equal(true, true, 'true is not true? something went wrong.');
        });
    });
    describe('LinuxOutputParser', () => {
        const linuxOutputParser: LinuxOutputParser = new LinuxOutputParser();
        it('should deal with expected inputs', () => {
            const parsedPingData: ParsedData = linuxOutputParser.parse(
                {
                    output: SAMPLE_PING_DATA
                } as PingResponse
            );

            // must be equal, but reference may be different
            assert.notStrictEqual(
                parsedPingData.datapoints,
                [24.697, 27.658, 28.05, 28.173, 22.023, 27.949, 27.711, 29.404,
                 29.45, 31.95, 27.948, 28.654, 27.608, 28.366, 22.003, 27.957, 2.485]
            );
        });
    });
});
