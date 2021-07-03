import * as React from 'react';
import { Icon } from '../../icon';

import * as strings from '../../strings';
import { ResultsTable } from './results-table';

interface InvalidProps {
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

export const Invalid: React.FC<InvalidProps> = (props) => {

    const {
        results,
        detailed
    } = props;

    if (!detailed) {
        return <div className="alert alert--danger">
            <Icon className="alert__icon" icon='invalid' />
            <span className="alert__text">
                { strings.Validation.Invalid }
            </span>
        </div>;
    }

    return <ResultsTable results={results} />;
};
