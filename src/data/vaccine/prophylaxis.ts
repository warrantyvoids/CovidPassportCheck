import data from '../../valuesets/vaccine-prophylaxis.json';

interface VaccineProphylaxisData {
    display: string;
    active: boolean;
}

export function vaccineProphylaxes(code: string): VaccineProphylaxisData {
    return data.valueSetValues[code] || {
        display: `Unknown prophylaxis (${code})`,
        active: false
    };
};
