import data from '../../valuesets/test-result.json';

interface TestResultData {
    display: string;
    active: boolean;
}

export function testResult(code: string): TestResultData {
    return data.valueSetValues[code] || {
        display: `Unknown test result (${code})`,
        active: false
    };
};
