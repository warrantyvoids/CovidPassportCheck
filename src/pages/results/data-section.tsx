import * as React from 'react';

import { ReadableSection } from '../../lib/make-readable';

interface DataSectionProps {
    section: ReadableSection;
    detailed: boolean;
}

export const DataSection: React.FC<DataSectionProps> = (props) => {
    const { section, detailed } = props;

    if (detailed) {
        if (section.detailed === false) {
            return null;
        }
    }
    else {
        if (section.detailed) {
            return null;
        }
    }

    const data = section.data.filter(d => d.detailed === undefined || d.detailed === detailed);

    return <section>
        <h2>{section.caption}</h2>
        <dl>{ data.map(d => <>
            <dt>{d.label}</dt>
            <dd>{d.value || '—'}</dd>
        </>) }</dl>
    </section>;
};