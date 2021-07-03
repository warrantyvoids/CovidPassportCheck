const https = require('https');
const fs = require('fs');

const url = 'https://github.com/ehn-dcc-development/dgc-business-rules/tree/main/rulesets';
const folder = 'src/rulesets/';

const countries = {
    'EU': '/EU/template-ruleset.json',
    'NL': '/NL/NL-specific-ruleset.json',
    'FI': '/FI/FI-specific-ruleset.json'
};

const download = (from, to) => {
    return new Promise((resolve, reject) => {;
        https.get(from, (res) => {
            const stream = fs.createWriteStream(to);
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

    const ps = Object.entries(countries).map(([country, path]) => download(url + path, folder + country + '.json'));
    await Promise.allSettled(ps);
};

update().then(
    () => {
        console.log('done');
    }
);