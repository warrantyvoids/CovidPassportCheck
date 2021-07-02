import data from '../../valuesets/test-type.json';

interface TestTypeData {
    display: string;
    active: boolean;
}

export function testType(code: string): TestTypeData {
    return data.valueSetValues[code] || {
        display: `Unknown test type (${code})`,
        active: false
    };
};
