import * as React from 'react';
import QrReader from 'react-qr-reader';
import { Layout } from '../../layout';
import { Results } from '../results';
import * as strings from '../../strings';
import { ScanError } from './scan-error';

interface ScanProps {

}

export const Scan: React.FC<ScanProps> = (props) => {

	let [data, setData] = React.useState<string>("");
	let [error, setError] = React.useState<{ message: string, type: 'error' | 'warning' }>(null);

	if (data) {
		return <Results data={data} rescan={() => setData("") } />;
	}

	const handleError = (err: string) => {
		setError({ message: strings.NoWebcamAccess(window.location.host), type: 'error' });
	};

	const handleScan = (result: string | null) => {
		if (result === null) {
			return;
		}

		if (result.length && result.startsWith("HC1:")) {
			setData(result);
		}
		else {
			throw "We don't support national QR codes, yet. Stay tuned!";
		}
	};

	if (error) {
		return <ScanError message={error.message} type={error.type} retry={() => { setError(null) }} />;
	}

	return <Layout>
		<QrReader
			className={'video'}
			showViewFinder={false}
			delay={125}
			onError={handleError}
			onScan={handleScan}
		/>
	</Layout>;
};
