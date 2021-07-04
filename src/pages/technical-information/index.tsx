import * as React from 'react';
import { Layout } from '../../layout';

import { TechnicalInformation as strings } from '../../strings';
import rulesets from '../../rulesets/update.json';
import valuesets from '../../valuesets/update.json';

export const TechnicalInformation: React.FC = () => {

    const lo: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZone: "UTC",
        timeZoneName:"short",
    };

    const rulesetsUpdated = new Date(rulesets.update).toLocaleString('en-GB', lo);
    const valuesetsUpdated = new Date(valuesets.update).toLocaleString('en-GB', lo);

    return <Layout>
        <h2>{strings.Heading}</h2>

        {strings.Text.map(line => <p>{line}</p>)}

        <h3>Data</h3>
        <p>Rulesets were last updated: { rulesetsUpdated }</p>
        <p>Valuesets were last updated: { valuesetsUpdated }</p>
    </Layout>;
};
