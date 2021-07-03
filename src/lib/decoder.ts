// @ts-ignore
import { inflate } from "pako";
import { decode as cbor_decode } from './cbor';
import { CovidCert, NL2CovidCert } from "./types";
import * as asn1js from "asn1js";

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


function base45nlDecode(encoded: string) {
    const qrCharset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:';
    const multiplier = BigInt(qrCharset.length);
    let bi = BigInt(0);
    for (const s of Array.from(encoded)) {
        bi *= multiplier;
        bi += BigInt(qrCharset.indexOf(s));
    }

    let hex = bi.toString(16);
    if (hex.length % 2) {
        hex = '0' + hex;
    }

    const len = hex.length / 2;
    const result = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        result[i] = parseInt(hex.slice(i + i, i + i + 2), 16);
    }

    return result;
}

export function parse(qrCode: string): CovidCert | NL2CovidCert {
    if (qrCode.startsWith("HC1:")) {
        return parseInternational(qrCode);
    } else if (qrCode.startsWith("NL2:")) {
        return parseNl2(qrCode);
    }
    throw "Unknown type";
}

export function parseInternational(qrCode: string): CovidCert {
    let bytes = qrCode.substr(4);
    const decoded = base45euDecode(bytes);
    const decompressed = inflate(decoded);

    const plainText = cbor_decode(decompressed.buffer);

    const payload = new Uint8Array(plainText[2]);
    const body = cbor_decode(payload.buffer);
    return body['-260']['1'] as CovidCert;
}

export function parseNl2(qrCode: string): NL2CovidCert {
    let bytes = qrCode.substr(4);
    const decoded = base45nlDecode(bytes);

    const deciphered = asn1js.fromBER(decoded.buffer);

    const topLevel = {
        DisclosedTimeSeconds: deciphered.result.valueBlock.value[0],
        C: deciphered.result.valueBlock.value[1],
        A: deciphered.result.valueBlock.value[2],
        EResponse: deciphered.result.valueBlock.value[3],
        VResponse: deciphered.result.valueBlock.value[4],
        AResponse: deciphered.result.valueBlock.value[5],
        ADisclosed: deciphered.result.valueBlock.value[6],
    };

    const aDisclosedSplit = {
        isSpecimen: Number(convert(topLevel.ADisclosed.valueBlock.value[1].valueBlock)),
        isPaperProof: Number(convert(topLevel.ADisclosed.valueBlock.value[2].valueBlock)),
        validFrom: new Date(Number(convert(topLevel.ADisclosed.valueBlock.value[3].valueBlock)) * 1000).toISOString(),
        validForHours: Number(convert(topLevel.ADisclosed.valueBlock.value[4].valueBlock)),
        firstNameInitial: convert(topLevel.ADisclosed.valueBlock.value[5].valueBlock),
        lastNameInitial: convert(topLevel.ADisclosed.valueBlock.value[6].valueBlock),
        birthDay: Number(convert(topLevel.ADisclosed.valueBlock.value[7].valueBlock)),
        birthMonth: Number(convert(topLevel.ADisclosed.valueBlock.value[8].valueBlock))
    };

    return aDisclosedSplit;
}

function convert(val: any) :any {
    const bytes = [];
    const rawBytes = new Uint8Array(val._valueHex);
    if ((rawBytes[0] >> 1) !== 0) {
        bytes.push(rawBytes[0] >> 1);
    }
    for (let i = 1; i < rawBytes.length; i++) {
        bytes.push((rawBytes[i] >> 1) | ((rawBytes[i-1] & 0x01) << 7));
    }
    return bytes.map(b => String.fromCharCode(b)).join('');
}
