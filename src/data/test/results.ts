import data from '../../valuesets/test-result.json';
import * as strings from '../../strings';

interface TestResultData {
    display: string;
    active: boolean;
}

export function testResult(code: string): TestResultData {
    if (!code) {
        return {
            display: strings.MissingData,
            active: false
        };
    }

    return data.valueSetValues[code] || {
        display: `Unknown test result (${code})`,
        active: false
    };
};
