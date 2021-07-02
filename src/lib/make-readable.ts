import { countries } from "../data/countries";
import { targets } from "../data/targets";
import { vaccineManufacturer } from "../data/vaccine/manufacturer";
import { vaccineMedicinalProducts } from "../data/vaccine/medicinal-product";
import { vaccineProphylaxes } from "../data/vaccine/prophylaxis";
import { CovidCert } from "./types";

import { Data as strings} from '../strings';
import { testType } from "../data/test/type";
import { string } from "yargs";
import { testManufacturer } from "../data/test/manufacturer";
import { testResult } from "../data/test/results";

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

function readableDisplay(label: string, value: string, display: (value: string) => { display: string }): ReadableData[] {
    return [
        {
            label,
            value: display(value).display,
            detailed: false
        },
        {
            label,
            value: value + ": " + display(value).display,
            detailed: true
        },
    ];
};

function readableTarget(label: string, value: string): ReadableData[] {
    return readableDisplay(label, value, targets);
};

function readableVaccine(label: string, value: string): ReadableData[] {
    return readableDisplay(label, value, vaccineProphylaxes);
};

function readableProduct(label: string, value: string): ReadableData[] {
    return readableDisplay(label, value, vaccineMedicinalProducts);
};

function readableManufacturer(label: string, value: string): ReadableData[] {
    return readableDisplay(label, value, vaccineManufacturer);
};

function readableTestType(label: string, value: string): ReadableData[] {
    return readableDisplay(label, value, testType);
};

function readableTestManufacturer(label: string, value: string): ReadableData[] {
    return readableDisplay(label, value, testManufacturer);
};

function readableTestResult(label: string, value: string): ReadableData[] {
    return [
        {
            label,
            value: testResult(value).display === 'Detected' ? strings.TestResultPositive : strings.TestResultNegative,
            detailed: false
        },
        {
            label,
            value: value + ": " + testResult(value).display,
            detailed: true
        },
    ];
};

export function makeReadable(cert: CovidCert): ReadableCert {

    const certificateInfo: ReadableSection = {
        caption: strings.Certificate,
        data: [{
            label: strings.Version,
            value: cert.ver
        }],
        detailed: true
    };

    const personalInfo: ReadableSection = {
        caption: strings.PersonalInformation,
        data: [{
            label: strings.GivenName,
            value: cert.nam.fn || cert.nam.fnt
        },
        {
            label: strings.FamilyName,
            value: cert.nam.fnt,
            detailed: true
        },
        {
            label: strings.GivenNameMachineReadable,
            value: cert.nam.gn || cert.nam.gnt
        },
        {
            label: strings.FamilyNameMachineReadable,
            value: cert.nam.gnt,
            detailed: true
        },
        ...readableDate(strings.DateOfBirth, cert.dob)
        ]
    };

    const vacineInfo = (cert.v || []).map((v, i) => ({
        caption: strings.Vaccine,
        data: [
           ...readableTarget(strings.Target, v.tg),
           ...readableVaccine(strings.Prophylaxis, v.vp),
           ...readableProduct(strings.VaccineProduct, v.mp),
           ...readableManufacturer(strings.VaccineManufacturer, v.ma),
            {
                label: "Doses",
                value: v.dn + ' of ' + v.sd
            },
            ...readableDate("Date of vacination", v.dt),
            ...readableCountry(strings.VaccineCountry, v.co),
            {
                label: strings.CertificateIssuer,
                value: v.is,
                detailed: true
            },
            {
                label: strings.CertificateId,
                value: v.ci,
                detailed: true
            }
        ]
    }));

    const testInfo = (cert.t || []).map((t, i) => ({
        caption: strings.Test,
        data: [
            ...readableTarget(strings.Target, t.tg),
            ...readableTestType(strings.TestType, t.tt),
            {
                label: strings.TestName,
                value: t.nm
            },
            ...readableTestManufacturer(strings.TestManufacturer, t.ma),
            ...readableDate(strings.SampleCollectionDate, t.sc),
            ...readableTestResult(strings.TestResult, t.tr),
            {
                label: strings.TestCentre,
                value: t.tc
            },
            ...readableCountry(strings.TestCountry, t.co),
            {
                label: strings.CertificateIssuer,
                value: t.is,
                detailed: true
            },
            {
                label: strings.CertificateId,
                value: t.ci,
                detailed: true
            }
        ]
    }));

    const recoveryInfo = (cert.r || []).map((r, i) => ({
        caption: strings.Recovery,
        data: [
            ...readableTarget(strings.Target, r.tg),
            ...readableDate(strings.FirstPositiveResultDate, r.fr),
            ...readableCountry(strings.TestCountry, r.co),
            ...readableDate(strings.CertificateValidFrom, r.df),
            ...readableDate(strings.CertificateValidUntil, r.du),
            {
                label: strings.CertificateIssuer,
                value: r.is,
                detailed: true
            },
            {
                label: strings.CertificateId,
                value: r.ci,
                detailed: true
            }            
        ]
    }));

    const result: ReadableCert = [personalInfo, ...vacineInfo, ...testInfo, ...recoveryInfo, certificateInfo];
    return result;
};