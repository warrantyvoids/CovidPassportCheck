import data from '../../valuesets/vaccine-medicinal-product.json';
import * as strings from '../../strings';

interface VaccineMedicinalProductData {
    display: string;
    active: boolean;
}

export function vaccineMedicinalProducts(code: string): VaccineMedicinalProductData {
    if (!code) {
        return {
            display: strings.MissingData,
            active: false
        };
    }

    return data.valueSetValues[code] || {
        display: `Unknown medicinal product (${code})`,
        active: false
    };
};
