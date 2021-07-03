import * as React from 'react';
import { Icon } from '../../icon';
import { Layout } from '../../layout';

import { DataSection } from './data-section';

import { ResultsProps } from '.';
import { parseNl2 } from '../../lib/decoder';
import { ReadableCert, readableDate } from '../../lib/make-readable';

const makeReadable = (data) => {
    const parsed = parseNl2(data);
    const result: ReadableCert = [{
            caption: "Dutch QR code",
            data: [
                {
                    label: "First name initial",
                    value: parsed.firstNameInitial
                },
                {
                    label: "Last name initial",
                    value: parsed.lastNameInitial
                },
                {
                    label: "Birth month",
                    value: parsed.birthMonth.toString()
                },
                {
                    label: "Birth day",
                    value: parsed.birthDay.toString()
                },
                {
                    label: "Valid for hours",
                    value: parsed.validForHours.toString()
                },
                ...readableDate("Valid from", parsed.validFrom),
                {
                    label: "Is paperproof",
                    value: parsed.isPaperProof ? 'Yes' : 'No',
                },
                {
                    label: "Is specimen",
                    value: parsed.isSpecimen ? 'Yes' : 'No',
                }
            ]
        }
    ];

    return result;
};

export const NL2Results: React.FC<ResultsProps> = (props) => {
    
    const { data, rescan } = props;

    const readable = makeReadable(data);

    return <Layout>
        <div className="button-set">
                <button className="button button--primary" onClick={() => { rescan(); }}>
                    <Icon className="button__icon" icon='qr' />
                    <span className="button__text">Scan another QR code</span>
                </button>
        </div> 

        { readable.map(section => <DataSection detailed={false} section={section} />) }
    </Layout>;
};

