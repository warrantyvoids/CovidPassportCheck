import * as React from 'react';
import { Layout } from '../../layout';

import { Cookies as strings } from '../../strings';

export const Cookies: React.FC = () => {
    return <Layout>
        <h2>{strings.Heading}</h2>

        {strings.Text.map(line => <p>{line}</p>)}
    </Layout>;
};
