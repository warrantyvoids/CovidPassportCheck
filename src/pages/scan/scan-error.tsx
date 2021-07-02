import * as React from 'react';
import { Icon } from '../../icon';
import { Layout } from '../../layout';

interface ScanErrorProps {
    type: 'error' | 'warning' | 'info';
    message: string;
    retry: () => void;
}

export const ScanError: React.FC<ScanErrorProps> = (props) => {
    const {
        type = 'error',
        message = "Something went wrong.",
        retry
    } = props;

    return <Layout>
        <div style={{textAlign: 'center', paddingBottom: '1em'}}>
            <Icon className={"icon--large icon--" + type} icon={type} /> 
        </div>
        <div style={{textAlign: 'center'}}>
            { message.split("\n").map(line => <p>{line}</p>) }
        </div>
        <div style={{display: 'flex', justifyContent: 'center', padding: '1em'}}>
            <button className="button button--primary button--hero" style={{justifySelf: 'center'}} onClick={retry}>
                <Icon className="button__icon" icon='qr' />
                <span className="button__text">
                    Scan QR Code
                </span>
            </button>
        </div>
    </Layout>;
};
