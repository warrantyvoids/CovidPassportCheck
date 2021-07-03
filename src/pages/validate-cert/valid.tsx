import * as React from 'react';
import { Icon } from '../../icon';

import * as strings from '../../strings';
import { ResultsTable } from './results-table';

interface ValidProps {
    results: {
        rule: {
            id: string,
            description: string,
            businessDescription: string
        },
        result: boolean
    }[];
    detailed: boolean;
}

export const Valid: React.FC<ValidProps> = (props) => {

    const {
        results,
        detailed
    } = props;

    if (!detailed) {
        return <div className="alert">
            <Icon className="alert__icon" icon='valid' />
            <span className="alert__text">
                { strings.Validation.Valid }
            </span>
        </div>;
    }

    return <>
        <ResultsTable results={results} />
    </>;
};
