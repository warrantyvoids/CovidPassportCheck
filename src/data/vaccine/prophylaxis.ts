import data from '../../valuesets/vaccine-prophylaxis.json';
import * as strings from '../../strings';

interface VaccineProphylaxisData {
    display: string;
    active: boolean;
}

export function vaccineProphylaxes(code: string): VaccineProphylaxisData {
    if (!code) {
        return {
            display: strings.MissingData,
            active: false
        };
    }

    return data.valueSetValues[code] || {
        display: `Unknown prophylaxis (${code})`,
        active: false
    };
};
