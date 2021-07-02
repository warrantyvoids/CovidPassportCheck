import { countries } from "../data/countries";
import { targets } from "../data/targets";
import { vaccineManufacturer } from "../data/vaccine/manufacturer";
import { vaccineMedicinalProducts } from "../data/vaccine/medicinal-product";
import { vaccineProphylaxes } from "../data/vaccine/prophylaxis";
import { CovidCert } from "./types";

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

function readableDate(label: string, value: string): ReadableData[] {
    return [
        {
            label,
            value: (new Date(value)).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }),
            detailed: false
        },
        {
            label,
            value,
            detailed: true
        }
    ];
}

function readableCountry(label: string, value: string): ReadableData[] {
    return [
        {
            label,
            value: countries(value),
            detailed: false
        },
        {
            label,
            value: value,
            detailed: true
        },
    ];
};

function readableTarget(label: string, value: string): ReadableData[] {
    return [
        {
            label,
            value: targets(value).display,
            detailed: false
        },
        {
            label,
            value: value + ": " + targets(value).display,
            detailed: true
        },
    ];
};

function readableVaccine(label: string, value: string): ReadableData[] {
    return [
        {
            label,
            value: vaccineProphylaxes(value).display,
            detailed: false
        },
        {
            label,
            value: value + ": " + vaccineProphylaxes(value).display,
            detailed: true
        },
    ];
};

function readableProduct(label: string, value: string): ReadableData[] {
    return [
        {
            label,
            value: vaccineMedicinalProducts(value).display,
            detailed: false
        },
        {
            label,
            value: value + ": " + vaccineMedicinalProducts(value).display,
            detailed: true
        },
    ];
};

function readableManufacturer(label: string, value: string): ReadableData[] {
    return [
        {
            label,
            value: vaccineManufacturer(value).display,
            detailed: false
        },
        {
            label,
            value: value + ": " + vaccineManufacturer(value).display,
            detailed: true
        },
    ];
};

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
        ...readableDate("Date of birth", cert.dob)
        ]
    };

    const vacineInfo = cert.v.map((vc, i) => ({
        caption: `Vacine`,
        data: [
           ...readableTarget("Target", vc.tg),
           ...readableVaccine("Vacine", vc.vp),
           ...readableProduct("Product", vc.mp),
           ...readableManufacturer("Manufacturer", vc.ma),
            {
                label: "Doses",
                value: vc.dn + ' of ' + vc.sd
            },
            ...readableDate("Date of vacination", vc.dt),
            ...readableCountry("Country", vc.co),
            {
                label: "Certificate Issuer",
                value: vc.is,
                detailed: true
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