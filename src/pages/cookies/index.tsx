import * as React from 'react';
import { Layout } from '../../layout';
import * as strings from '../../strings';

export const Cookies: React.FC = () => {
    return <Layout>
        <h2>Cookies</h2>
        { strings.Cookies.split("\n").map(line => <p>{line}</p>) }
    </Layout>;
};
