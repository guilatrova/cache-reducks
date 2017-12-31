/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import AppBody from './AppBody';

// Stubbed components
const HomePage = () => <p>Home</p>;
const NotFoundPage = () => <p>Not found</p>;

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
	render() {
		return (
			<div>
				<AppBody>
					<Switch>

						<Route exact path="/" component={HomePage} />
						<Route path="/login" component={HomePage} />
						<Route component={NotFoundPage} />

					</Switch>
				</AppBody>
			</div>
		);
	}
}

App.propTypes = {
	children: PropTypes.element
};

export default App;
