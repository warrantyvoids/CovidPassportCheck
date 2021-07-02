import { countries } from "../data/countries";
import { CovidCert } from "./decoder";

export type ReadableCert = ReadableSection[];

export type ReadableSection = {
    caption: string;
    data: ReadableData[];
    detailed?: boolean;
};

export type ReadableData = {
    label: string;
    value: string;
    detailed?: boolean;
}

export function makeReadable(cert: CovidCert): ReadableCert {

    const certificateInfo: ReadableSection = {
        caption: "Certificate",
        data: [{
            label: "Version",
            value: cert.ver
        }],
        detailed: true
    };

    const personalInfo: ReadableSection = {
        caption: "Personal Information",
        data: [{
            label: "Family name",
            value: cert.nam.fn
        },
        {
            label: "Given name",
            value: cert.nam.gn
        },
        {
            label: "Family name (machine readable)",
            value: cert.nam.fnt,
            detailed: true
        },
        {
            label: "Given name (machine readable)",
            value: cert.nam.gnt,
            detailed: true
        },
        {
            label: "Date of birth",
            value: (new Date(cert.dob)).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }),
            detailed: false
        },
        {
            label: "Date of birth",
            value: cert.dob,
            detailed: true
        }]
    };

    const vacineInfo = cert.v.map((vc, i) => ({
        caption: `Vacine`,
        data: [
            {
                label: "Target",
                value: vc.tg,
            },
            {
                label: "Vacine",
                value: vc.vp
            },
            {
                label: "Product",
                value: vc.mp
            },
            {
                label: "Manufacturer",
                value: vc.ma
            },
            {
                label: "Doses",
                value: vc.dn + ' of ' + vc.sd
            },
            {
                label: "Date of vacination",
                value: (new Date(vc.dt)).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }),
                detailed: false
            },
            {
                label: "Date of vacination",
                value: vc.dt,
                detailed: true
            },
            {
                label: "Country",
                value: countries(vc.co),
                detailed: false
            },
            {
                label: "Country",
                value: vc.co,
                detailed: true
            },
            {
                label: "Issuer",
                value: vc.is
            },
            {
                label: "Certificate ID",
                value: vc.ci,
                detailed: true
            }
        ]
    }));

    const testInfo = [];

    const recoveryInfo = [];

    const result: ReadableCert = [personalInfo, ...vacineInfo, ...testInfo, ...recoveryInfo, certificateInfo];
    return result;
};