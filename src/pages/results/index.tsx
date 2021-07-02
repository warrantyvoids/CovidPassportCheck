import * as React from 'react';
import { Icon } from '../../icon';
import { Layout } from '../../layout';

import { parse } from '../../lib/decoder';
import { makeReadable } from '../../lib/make-readable';

import { DataSection } from './data-section';

interface ResultsProps {
    data: string;
    rescan: () => void;
}

export const Results: React.FC<ResultsProps> = (props) => {
    
    const { data, rescan } = props;

    const parsed = parse(data);
    const readable = makeReadable(parsed);
    
    const [detailed, setDetailed] = React.useState<boolean>(false);

    const handleClick = () => {
        setDetailed(!detailed);
    };

    return <Layout>
        <div className="button-set">
            <button className="button button--primary" onClick={() => { rescan(); }}>
                <Icon className="button__icon" icon='qr' />
                <span className="button__text">Scan another QR code</span>
            </button>
            <button aria-pressed={detailed} className="button button--secondary" onClick={handleClick}>
                <Icon className="button__icon" icon={detailed ? 'less' : 'more'} />
                <span className="button__text">{detailed ? 'Hide details' : 'Show details'}</span>
            </button>
        </div>
        
        { readable.map(section => <DataSection detailed={detailed} section={section} />) }
    </Layout>;
};

