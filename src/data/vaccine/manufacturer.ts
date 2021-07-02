import data from '../../valuesets/vaccine-mah-manf.json';
import * as strings from '../../strings';

interface VaccineManufacturerData {
    display: string;
    active: boolean;
}

export function vaccineManufacturer(code: string): VaccineManufacturerData {
    if (!code) {
        return {
            display: strings.MissingData,
            active: false
        };
    }

    return data.valueSetValues[code] || {
        display: `Unknown vaccine manufacturer (${code})`,
        active: false
    };
};
