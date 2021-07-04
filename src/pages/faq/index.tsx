import * as React from 'react';
import { Layout } from '../../layout';
import { FAQ as items } from '../../strings';

export const FAQ: React.FC = () => {
    return <Layout>
        <h2>Frequently asked questions (FAQ).</h2>
        {
            items.map(({q, a, l}, i) => <section key={i}>
                <h3>{q}</h3>
                { Array.isArray(a) ? a.map((l, i) => <p key={i}>{l}</p>) : <p>{a}</p> }
                { l && <a href={l} target='_blank'>{l}</a> }
            </section>)
        }
    </Layout>;
};
