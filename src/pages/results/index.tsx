import * as React from 'react';
import { Icon } from '../../icon';
import { Layout } from '../../layout';

import { parse } from '../../lib/decoder';
import { makeReadable } from '../../lib/make-readable';
import { ValidateCert } from '../validate-cert';

import { DataSection } from './data-section';

import * as strings from '../../strings';

interface ResultsProps {
    data: string;
    rescan: () => void;
}

export const Results: React.FC<ResultsProps> = (props) => {
    
    const { data, rescan } = props;

    const parsed = parse(data);
    const readable = makeReadable(parsed);

    const [detailed, setDetailed] = React.useState<boolean>(false);
    const [results, setResults] = React.useState<string | null>(null);

    const handleClick = () => {
        setDetailed(!detailed);
    };

    React.useEffect(() => {
        window.document.querySelector('main').scrollTop = 0;
    }, [results]);

    return <Layout>
        { results 
            ? <div className="button-set">
                <button className="button button--secondary" onClick={() => { setResults(null) }}>
                    <Icon className="button__icon" icon='back' />
                    <span className="button__text">{strings.Back}</span>
                </button>
            </div>
            : <div className="button-set">
                <button className="button button--primary" onClick={() => { rescan(); }}>
                    <Icon className="button__icon" icon='qr' />
                    <span className="button__text">Scan another QR code</span>
                </button>
                <button aria-pressed={detailed} className="button button--secondary" onClick={handleClick}>
                    <Icon className="button__icon" icon={detailed ? 'less' : 'more'} />
                    <span className="button__text">{detailed ? strings.LessDetails : strings.MoreDetails}</span>
                </button>
            </div> 
        }
        
        { !results && readable.map(section => <DataSection detailed={detailed} section={section} />) }

        <ValidateCert data={parsed} results={results} setResults={(r) => {setResults(r); }} />
    </Layout>;
};

