export const Errors = {
    NoWebcamAccess: (url: string) => [
        `${url} has been blocked from accessing your camera.`, 
        'We need to access your camera in order to scan QR codes.',
        'To scan a QR code, grant access to your camera, make sure no other app is using the camera and then click the scan button.'
    ],
    NotRecognised: [
        'We don\'t recognise this QR code (yet) 😢',
        'Try scanning an international or Dutch QR code.'
    ],
    Generic: [
        'Something went wrong.'
    ],
};

export const Back = 'Back';

export const MoreDetails = 'More details';
export const LessDetails = 'Less details';
export const RawData = 'Raw data';

export const Lead = `Scan a QR code to see the information in it.`;

export const MissingData = '—';

export const Cookies = {
    Heading: 'Cookies',
    Text: [
        'We don\'t use cookies.'
    ]
};

export const Privacy = {
    Heading: 'Privacy',
    Text: [
        'We don\'t store any data about you or the codes you scan.',
        'No data, personal or otherwise, is ever transmitted from your browser. The only things downloaded from this site are the sources for the web page. We don\'t track any information.'
    ]
};

export const Data = {
    Certificate: 'Certificate',
    CertificateIssuer: 'Certificate issued by',
    CertificateId: 'Certificate ID',
    CertificateValidFrom: 'Valid from',
    CertificateValidUntil: 'Valid until',
    Version: 'Version',

    PersonalInformation: "Personal Information",
    GivenName: 'Given name',
    GivenNameMachineReadable: 'Given name (machine readable)',
    FamilyName: 'Family name',
    FamilyNameMachineReadable: 'Family name (machine readable)',
    DateOfBirth: 'Date of birth',

    Vaccine: 'Vaccine',
    VaccineCountry: 'Country',
    VaccineManufacturer: 'Manufacturer',
    Prophylaxis: 'Vaccine',
    VaccineProduct: 'Product',

    Target: 'Target',
    Test: 'Test',
    TestType: 'Type',
    TestName: 'Product',
    TestManufacturer: 'Manufacturer',
    SampleCollectionDate: 'Date',
    TestResult: 'Result',
    TestResultPositive: 'Positive',
    TestResultNegative: 'Negative',
    TestCentre: 'Centre',
    TestCountry: 'country',

    Recovery: 'Recovery',
    FirstPositiveResultDate: 'Date of first positive test result',
};

export const FAQ = [
    {
        Q: 'Why did you make this site?',
        A: 'We were very curious what was actually in the QR codes of our government. We know the codes are' +
            ' both internationally used and a domestic version exists, and wanted to see if we can verify that no personal ' +
            'information was leaked.'
    },
    {
        Q: 'Can I use this site to check corona certificates/passports?',
        A: 'NO! We do not validate the certificates, as we do not posses them. This means that an attacker' +
            'could make their own certificates, and we would never know this',
    },
    {
        Q: 'Can I help?',
        A: 'We are currently looking for more test cases, bug reports and if possible, an up to date endpoint ' +
            'containing both the certificates and rules.',
    },
    {
        Q: 'Is this site open source?',
        A: 'Yes! The site is released as a BSD 3 clause and can be found on github: https://github.com/warrantyvoids/CovidPassportCheck',
    }
];

export const TechnicalInformation = {
    HowDoesThisWork: 'We currently support two families of certificates: HC1 certificates and NL2 certificates. Although' +
        'both are QR codes which can be scanned to retrieve information, they serve different purposes and contain different' +
        ' information in different formats.',
    HC1: 'HC1 encoded certificates are EU-wide and contain quite some information. Their intent is to answer the question: ' +
        '"Is this person vaccinated, tested or recovered", with a focus on exchanging this information.',
    NL2: 'NL2 encoded certificates are specifically Dutch certificates, intended for use in the Netherlands by people residing' +
        'in the Netherlands. This information is meant for Dutch festivals, organisations and companies, in order to check' +
        ' if somebody is allowed entry without giving any medical information.'
}

export const Validation = {
    OtherEuCountries: 'Other EU countries',
    Validity: 'Validity',
    Valid: 'Valid',
    Invalid: 'Invalid',
    Details: 'Result details'
};
