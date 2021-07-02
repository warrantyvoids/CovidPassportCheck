// @ts-ignore
import { inflate } from "pako";
import { decode as cbor_decode } from './cbor';

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
