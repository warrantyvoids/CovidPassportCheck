import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './app.scss';
import { Scan } from './pages/scan';
import { ScanError } from './pages/scan/scan-error';
import { Privacy } from './pages/privacy';
import { Cookies } from './pages/cookies';
import { Home } from './pages/home';
import { FAQ } from './pages/faq';
import { TechnicalInformation } from './pages/technical-information';

const App = () => {
	return <BrowserRouter>
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/scan/error" component={ScanError} />
			<Route path="/scan" component={Scan} />
			<Route path="/faq" component={FAQ} />
			<Route path="/technical-information" component={TechnicalInformation} />
			<Route path="/privacy" component={Privacy} />
			<Route path="/cookies" component={Cookies} />
		</Switch>
	</BrowserRouter>;
}

export default App;
