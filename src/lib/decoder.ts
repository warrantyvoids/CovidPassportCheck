// @ts-ignore
import { inflate } from "pako";
import { decode as cbor_decode } from './cbor';

type DateString = string;
type CountryString = 'NL' | string;

export type CovidCert = {
    ver: string; // version
    dob: DateString; // date of birth
    nam: {
        fn: string; // family name
        fnt: string; // family name (machine translatable)
        gn: string; // given name
        gnt: string; // given name (machine translatable)
    }
    v: Vacination130[];
};

export interface Vacination130 {
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

function base45euDecode(encoded: string) {
    const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";
    const charsetLen = 45;
    const charsetLenSquared = 2025;
    const mapping = new Map(Array.from(characters).map((c, idx) => [c, idx]));

    const lastChunkSize = encoded.length % 3;
    const tripletPartLength =  encoded.length - lastChunkSize;
    if (lastChunkSize === 1) {
        throw "Invalid size";
    }

    const values = Array.from(encoded).map(ch => mapping.get(ch));
    if (values.find(v => v === undefined)) {
        throw "Invalid character";
    }

    const data = [];
    for (let i = 0; i < tripletPartLength; i += 3) {
        const val = (values[i] as number) + (values[i+1] as number) * charsetLen + (values[i+2] as number) * charsetLenSquared;
        data.push((val / 256) | 0);
        data.push(val % 256);
    }

    if (lastChunkSize === 2) {
        const val = (values[tripletPartLength] as number) + (values[tripletPartLength + 1] as number) * charsetLen;
        data.push(val);
    }

    const asTypedArray = new Uint8Array(data);

    return asTypedArray;
}

export function parse(qrCode: string): CovidCert {
    if (!qrCode.startsWith("HC1:")) {
        throw "Unknown type";
    }
    
    let bytes = qrCode.substr(4);
    const decoded = base45euDecode(bytes);
    const decompressed = inflate(decoded);
   
    const plainText = cbor_decode(decompressed.buffer);

    const payload = new Uint8Array(plainText[2]);
    const body = cbor_decode(payload.buffer);
    return body['-260']['1'] as CovidCert;
}
