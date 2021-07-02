import country2codes from '../valuesets/country-2-codes.json';

export function countries(code: string): string {
    return country2codes.valueSetValues[code.toUpperCase()] || `Unknown country (${code})`;
};
