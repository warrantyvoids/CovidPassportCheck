import * as React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../../icon';
import { Layout } from '../../layout';
import * as strings from '../../strings';

interface HomeProps {

}

export const Home: React.FC<HomeProps> = (props) => {
    return <Layout>
        <div style={{textAlign: 'center', paddingBottom: '1em'}}>
             <Icon className="icon--large" icon='qr' />
        </div>
        <div style={{textAlign: 'center'}}>
            { strings.Lead.split("\n").map(line => <p>{line}</p>) }
        </div>
        <div style={{display: 'flex', justifyContent: 'center', padding: '1em'}}>
            <Link to='/scan' className="button button--primary button--hero" style={{justifySelf: 'center'}}>
                <Icon className="button__icon" icon='qr' />
                <span className="button__text">
                    Scan QR Code
                </span>
            </Link>
        </div>
    </Layout>;
};
