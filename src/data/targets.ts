import data from '../valuesets/disease-agent-targeted.json';

import * as strings from '../strings';

interface TargetData {
    display: string;
    active: boolean;
}

export function targets(code: string): TargetData {
    if (!code) {
        return {
            display: strings.MissingData,
            active: false
        };
    }

    return data.valueSetValues[code] || {
        display: `Unknown disease (${code})`,
        active: false
    };
};
