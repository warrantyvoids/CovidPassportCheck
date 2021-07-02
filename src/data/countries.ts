import country2codes from '../valuesets/country-2-codes.json';

import * as strings from '../strings';

export function countries(code: string): string {
    if (!code) {
        return strings.MissingData;
    }

    return country2codes.valueSetValues[code.toUpperCase()].display || `Unknown country (${code})`;
};
