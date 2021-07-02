const https = require('https');
const fs = require('fs');

const url = 'https://raw.githubusercontent.com/ehn-dcc-development/ehn-dcc-schema/release/1.3.0/valuesets/';
const folder = 'src/valuesets/';

const files = [
    'country-2-codes.json',
    'disease-agent-targeted.json',
    'test-manf.json',
    'test-result.json',
    'test-type.json',
    'vaccine-mah-manf.json',
    'vaccine-medicinal-product.json',
    'vaccine-prophylaxis.json'
];

const download = (from, to, file) => {
    return new Promise((resolve, reject) => {;
        https.get(from + file, (res) => {
            const stream = fs.createWriteStream(to + file);
            stream.on('finish', () => {
                stream.close();
                resolve();
            });
            res.pipe(stream);
        });
    });
};

const update = async() => {
    await fs.promises.rm('./' + folder, { recursive: true, force: true });
    await fs.promises.mkdir('./' + folder);

    const ps = files.map(f => download(url, folder, f));
    await Promise.allSettled(ps);
};

update().then(
    () => {
        console.log('done');
    }
);