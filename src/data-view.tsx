import * as React from 'react';

import { parse } from './lib/decoder';
import { makeReadable } from './lib/make-readable';

import { DataSection } from './data-section';

interface DataProps {
    data: string;
}

export const Data: React.FC<DataProps> = (props) => {
    
    const { data } = props;

    const parsed = parse(data);
    const readable = makeReadable(parsed);
    
    const [detailed, setDetailed] = React.useState<boolean>(false);

    const handleClick = () => {
        setDetailed(!detailed);
    };

    return <>
        <header>
            <h1>Covid Passport Check</h1>
            <button className="button" onClick={handleClick}>
                <span className="button__label">{detailed ? 'Hide details' : 'Show detailed'}</span>
            </button>
        </header>
        <main>
            { readable.map(section => <DataSection detailed={detailed} section={section} />) }
        </main>
    </>;
};

