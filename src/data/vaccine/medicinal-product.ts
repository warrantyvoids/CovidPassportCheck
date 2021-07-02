import data from '../../valuesets/vaccine-medicinal-product.json';

interface VaccineMedicinalProductData {
    display: string;
    active: boolean;
}

export function vaccineMedicinalProducts(code: string): VaccineMedicinalProductData {
    return data.valueSetValues[code] || {
        display: `Unknown medicinal product (${code})`,
        active: false
    };
};
