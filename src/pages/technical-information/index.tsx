import * as React from 'react';
import { Layout } from '../../layout';

import { TechnicalInformation as strings } from '../../strings';

export const TechnicalInformation: React.FC = () => {
    return <Layout>
        <h2>{strings.Heading}</h2>

        {strings.Text.map(line => <p>{line}</p>)}
    </Layout>;
};
