import * as React from 'react';
import { Icon } from '../../icon';
import { Layout } from '../../layout';

import { DataSection } from './data-section';

import { ResultsProps } from '.';
import { parseNl2 } from '../../lib/decoder';
import { ReadableCert, readableDate } from '../../lib/make-readable';

import { NL2 as strings, ScanAnother } from '../../strings';

const makeReadable = (data) => {
    const parsed = parseNl2(data);
    const result: ReadableCert = [{
            caption: "Dutch QR code",
            data: [
                {
                    label: strings.FirstNameInitial,
                    value: parsed.firstNameInitial
                },
                {
                    label: strings.LastNameInitial,
                    value: parsed.lastNameInitial
                },
                {
                    label: strings.BirthMonth,
                    value: parsed.birthMonth.toString()
                },
                {
                    label: strings.BirthDay,
                    value: parsed.birthDay.toString()
                },
                {
                    label: strings.ValidFor,
                    value: parsed.validForHours.toString() + " " + strings.Hours
                },
                ...readableDate(strings.ValidFrom, parsed.validFrom),
                {
                    label: strings.IsPaperproof,
                    value: parsed.isPaperProof ? strings.Yes : strings.No
                },
                {
                    label: strings.IsSpecimen,
                    value: parsed.isSpecimen ? strings.Yes : strings.No,
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
                    <span className="button__text">{ScanAnother}</span>
                </button>
        </div> 

        { readable.map(section => <DataSection detailed={false} section={section} />) }
    </Layout>;
};

