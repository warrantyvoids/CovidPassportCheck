import data from '../../valuesets/test-manf.json';
import * as strings from '../../strings';

interface TestManufacturerData {
    display: string;
    active: boolean;
}

export function testManufacturer(code: string): TestManufacturerData {
    if (!code) {
        return {
            display: strings.MissingData,
            active: false
        };
    }
    
    return data.valueSetValues[code] || {
        display: `Unknown test manufacturer (${code})`,
        active: false
    };
};
