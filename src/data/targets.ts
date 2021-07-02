import data from '../valuesets/disease-agent-targeted.json';

interface TargetData {
    display: string;
    active: boolean;
}

export function targets(code: string): TargetData {
    return data.valueSetValues[code] || {
        display: `Unknown disease (${code})`,
        active: false
    };
};
