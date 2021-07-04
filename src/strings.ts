export const App = 'Covid Check'

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

export const Scan = 'Scan QR Code';
export const ScanAnother = 'Scan another QR code';
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

export const TechnicalInformation = {
    Heading: 'Technical Information',
    Text: [
        'We currently support two families of codes: HC1 and NL2. Although' +
        'both are QR codes which can be scanned to retrieve information, they serve different purposes and contain different' +
        ' information in different formats.',
        'HC1 codes are used EU-wide and contain quite some information. Their intent is to answer the question: ' +
        '"Is this person vaccinated, tested or recovered?", with a focus on exchanging this information.',
        'NL2 codes are specifically Dutch codes, intended for use in the Netherlands by people residing' +
        'in the Netherlands. This information is meant for Dutch festivals, organisations and companies, in order to check' +
        ' if somebody is allowed entry without leaking any medical or personal information.'
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
        q: 'Why did you make this site?',
        a: 'We were very curious what was actually in the QR codes of our government. We know the codes are' +
            ' both internationally used and a domestic version exists, and wanted to see if we can verify that no personal ' +
            'information was leaked.'
    },
    {
        q: 'Can I use this site to check corona certificates/passports?',
        a: ['NO! We do not validate the certificates, as we do not posses them. This means that an attacker' +
            'could make their own certificates, and we would never notice they are fake.',
            'Furthermore, we show all information, including medical and personal information we can find in the code, so make sure you have permission from the owner of the code to view this information.'
        ],
    },
    {
        q: 'Can I help?',
        a: 'We are currently looking for more test cases, bug reports and if possible, an up to date endpoint ' +
            'containing both the certificates and rules.',
    },
    {
        q: 'Is this site open source?',
        a: 'Yes! The site is released as a BSD 3 clause and can be found on github.',
        l: 'https://github.com/warrantyvoids/CovidPassportCheck',
    }
];

export const NL2 = {
    Caption: "Dutch QR code",
    FirstNameInitial: "First name initial",
    LastNameInitial: "Last name initial",
    BirthMonth: "Birth month",
    BirthDay: "Birth day",
    ValidFor: "Valid for",
    Hours: 'hours',
    ValidFrom: 'Valid from',
    IsPaperproof: 'Is paperproof',
    IsSpecimen: 'Is specimen',
    Yes: 'Yes',
    No: 'No'
};

export const Validation = {
    OtherEuCountries: 'Other EU countries',
    Validity: 'Validity',
    Valid: 'Valid',
    Invalid: 'Invalid',
    Details: 'Result details'
};

export const Layout = {
    ShowMenu: 'Show menu',
    HideMenu: 'Hide menu',
    Home: 'Home',
    Scan: 'Scan',
    FAQ: 'FAQ',
    TechnicalInformation: 'Technical information',
    Privacy: 'Privacy',
    Cookies: 'Cookies'
};