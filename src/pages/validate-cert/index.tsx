import * as React from 'react';
import * as CertLogic from 'certlogic-js';

import eu from '../../rulesets/EU.json'; 
import nl from '../../rulesets/NL.json'; 
import fi from '../../rulesets/FI.json';

import { CovidCert } from '../../lib/types';

import country2codes from '../../valuesets/country-2-codes.json';
import diseaseAgentTargeted from '../../valuesets/disease-agent-targeted.json';
import vaccineMahManf from '../../valuesets/vaccine-mah-manf.json';
import vaccineMedicinalProduct from '../../valuesets/vaccine-medicinal-product.json';
import vaccineProphylaxis from '../../valuesets/vaccine-prophylaxis.json';

import testManf from '../../valuesets/test-manf.json'
import testResult from '../../valuesets/test-result.json';
import testType from '../../valuesets/test-type.json';

import * as strings from '../../strings';
import { countries } from '../../data/countries';
import { Valid } from './valid';
import { Invalid } from './invalid';
import { ResultsTable } from './results-table';
import { Icon } from '../../icon';

interface ValidationProps {
    data: CovidCert;
    results: string;
    setResults: (value: string) => void;
}

export const ValidateCert: React.FC<ValidationProps> = (props) => {
    const {
        data: payload,
        results,
        setResults
     } = props;

     const data = {
         payload,
         external: {
            valueSets: {
                "country-2-codes": Object.keys(country2codes.valueSetValues),
                "disease-agent-targeted": Object.keys(diseaseAgentTargeted.valueSetValues),
                "covid-19-lab-test-manufacturer-and-name": Object.keys(testManf.valueSetValues),
                "covid-19-lab-result": Object.keys(testResult.valueSetValues),
                "covid-19-lab-test-type": Object.keys(testType.valueSetValues),
                "vaccines-covid-19-auth-holders": Object.keys(vaccineMahManf.valueSetValues),
                "vaccines-covid-19-names": Object.keys(vaccineMedicinalProduct),
                "sct-vaccines-covid-19": Object.keys(vaccineProphylaxis),
            },
            validationClock: (new Date()).toISOString()
         }
     };

    let resultsPerCountry = [
        {
            rules: fi,
            code: 'fi'
        },
        {
            rules: nl,
            code: 'nl'
        },
        {
            rules: eu,
            code: 'eu',
            caption: strings.Validation.OtherEuCountries
        }
    ].map(c => ({
        code: c.code,
        caption: c.caption || countries(c.code),
        results: c.rules.map(r => ({ 
            rule: r,
            result: CertLogic.evaluate(r.logic, data) as boolean
        }) as {
            rule: {
                id: string,
                description: string,
                businessDescription: string
            },
            result: boolean
        }) 
    }));

    if (results) {
        let r = resultsPerCountry.find(r => r.code === results);

        return <>
            <h3>{ r.caption }</h3>
            <ResultsTable results={r.results} /> 
        </>;
    }

    return <section>
        <h2>{ strings.Validation.Validity }</h2> {
            resultsPerCountry.map(r => <section key={r.caption}>
                <h3>{ r.caption }</h3>
                { r.results.every(result => result.result) 
                    ? <Valid results={r.results} detailed={false} /> 
                    : <Invalid results={r.results} detailed={false} /> }
                <div className="button-set">
                    <button className="button button--secondary" onClick={() => { setResults(r.code);   }}>
                        <Icon className="button__icon" icon='details' />
                        <span className="button__text">{ strings.Validation.Details }</span>
                    </button>
                </div>
            </section>)
        }
    </section>;
};