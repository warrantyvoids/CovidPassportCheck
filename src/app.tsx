import React from 'react';

import './app.css';
import { Main } from './main-view';
import { Error } from './error-view';
import { Data } from './data-view';

const App = () => {
	const [view, setView] = React.useState<'main' | 'data' | 'error'>('main');
	const [data, setData] = React.useState<string>('');
	const [error, setError] = React.useState<string>('');

	const handleCode = (code: string) => { 
		setData(code);
		setView('data');
	};

	const handleError = (error: string) => {
		setError(error);
		setView('error');
	};

	return <div className={'App view--' + view}>
		{ view === 'main' ? <Main onCode={handleCode} onError={handleError} /> : null }
		{ view === 'data' ? <Data data={data} /> : null }
		{ view === 'error' ? <Error error={error} /> : null }
	</div>;
}

export default App;
