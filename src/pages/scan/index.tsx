import * as React from 'react';
import QrReader from 'react-qr-reader';
import { useHistory } from 'react-router';
import { Layout } from '../../layout';
import { Results } from '../results';

interface ScanProps {

}

export const Scan: React.FC<ScanProps> = (props) => {

	let [data, setData] = React.useState<string>("");

	let history = useHistory();

	if (data) {
		return <Results data={data} rescan={() => setData("") } />;
	}

	const handleError = (err: string) => {
		history.push('/scan/camera-error');
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
