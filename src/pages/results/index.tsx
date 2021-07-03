import * as React from 'react';
import { HC1Results } from './hc1';
import { NL2Results } from './nl2';

export interface ResultsProps {
    data: string;
    rescan: () => void;
}

export const Results: React.FC<ResultsProps> = (props) => {
    const {
        data,
        rescan
    } = props;

    switch (data.slice(0, 3)) {
        case "HC1":
            return <HC1Results data={data} rescan={rescan} />;

        case "NL2":
            return <NL2Results data={data} rescan={rescan} />;

        default:
            return null;
    }
};

