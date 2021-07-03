export const Errors = {
    NoWebcamAccess: (url: string) => [
        `${url} has been blocked from accessing your camera.`, 
        'We need to access your camera in order to scan QR codes.',
        'To scan a QR code, grant access to your camera, make sure no other app is using the camera and then click the scan button.'
    ],
    NotRecognised: [
        'We don\'t recognise this QR code (yet) 😢',
        'Try scanning an international QR code.'
    ],
    Generic: [
        'Something went wrong.'
    ],
};

export const Back = 'Back';

export const MoreDetails = 'More details';
export const LessDetails = 'Less details';

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
        'No data, personal or otherwise, is ever transmitted (except for the bare technical necesities needed for website to download and run in your browser).'
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

export const FAQ = {
    
};

export const Validation = {
    OtherEuCountries: 'Other EU countries',
    Validity: 'Validity',
    Valid: 'Valid',
    Invalid: 'Invalid',
    Details: 'Result details'
};
