import data from '../../valuesets/vaccine-mah-manf.json';

interface VaccineManufacturerData {
    display: string;
    active: boolean;
}

export function vaccineManufacturer(code: string): VaccineManufacturerData {
    return data.valueSetValues[code] || {
        display: `Unknown vaccine manufacturer (${code})`,
        active: false
    };
};
