import * as React from 'react';
import QrReader from 'react-qr-reader';

import * as strings from './strings';

interface MainProps {
	onCode: (code: string) => void;
	onError: (code: string) => void;
}

export const Main: React.FC<MainProps> = (props) => {
	const { onCode, onError } = props;

	const handleError = (err: string) => {
		let s = JSON.stringify(err);

		if (s === "{}") {
			let url = window.location.host;
			s = strings.NoWebcamAccess(url);
		}

		onError(s);
	};

	const handleScan = (result: string | null) => {
		if (result === null) {
			return;
		}

		if (result.length && result.startsWith("HC1:")) {
			console.log(result);
			onCode(result);
		}
		else {
			onError("We don't support national QR codes, yet. Stay tuned!");
		}
	};

	return <>
		<header>
			<h1>Covid Passport Check</h1>
		</header>
		<main>
			<QrReader
				className={'video'}
				showViewFinder={false}
				delay={125}
				onError={handleError}
				onScan={handleScan}
			/>
		</main>
	</>;
};
