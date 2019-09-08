import 'mocha';
import * as assert from 'assert';

describe('test', () => {
    describe('mocha', () => {
        it('should assert true is true', () => {
            assert.strict.equal(true, true, 'true is not true? something went wrong.');
        });
    });
});
