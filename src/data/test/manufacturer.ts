import data from '../../valuesets/test-manf.json';

interface TestManufacturerData {
    display: string;
    active: boolean;
}

export function testManufacturer(code: string): TestManufacturerData {
    return data.valueSetValues[code] || {
        display: `Unknown test manufacturer (${code})`,
        active: false
    };
};
