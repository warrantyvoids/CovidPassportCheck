type DateString = string;
type CountryString = 'NL' | string;

export type CovidCert = {
    ver: string; // version
    dob: DateString; // date of birth
    nam: {
        fn?: string; // family name
        fnt: string; // family name (machine translatable)
        gn?: string; // given name
        gnt?: string; // given name (machine translatable)
    }
    v?: Vacination[];
    t?: Test[];
    r?: Recovery[];
};

export interface Vacination {
    tg: string; // Target
    vp: string; // Vacine
    mp: string; // Product
    ma: string; // Manufacturer
    dn: number; // # of doses
    sd: number; // doses in set
    dt: DateString; // date of vacination
    co: CountryString; // country
    is: string; // Issuer
    ci: string; // certificate ID
};

type TestResult = string;

export interface Test {
    tg: string; // Target
    tt: string; // Type of test
    nm?: string; // Test name
    ma?: string; // Manufacturer
    sc: DateString; // Date of sample collection
    tr: TestResult; // Test result
    tc?: string; // Testing center
    co: CountryString; // country of test
    is: string; // certificate issuer
    ci: string; // certificate ID
}

export interface Recovery {
    tg: string; // target
    fr: DateString; // date of first positive result.
    co: CountryString; // country of test
    is: string; // certificate issuer
    df: DateString; // valid from
    du: DateString; // valid until
    ci: string; // certificate ID
};
