import data from '../../valuesets/test-type.json';
import * as strings from '../../strings';

interface TestTypeData {
    display: string;
    active: boolean;
}

export function testType(code: string): TestTypeData {
    if (!code) {
        return {
            display: strings.MissingData,
            active: false
        };
    }

    return data.valueSetValues[code] || {
        display: `Unknown test type (${code})`,
        active: false
    };
};
