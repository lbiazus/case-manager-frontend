import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import routes from './routes';
import * as serviceWorker from './serviceWorker';
import store from './store';
import './index.css';

const basename = process.env.PUBLIC_URL || 'case-manager-web'

const Root = (
  <Provider store={store} >
		<BrowserRouter basename={basename}>
			<Switch>
				{routes.map(route => <Route key={route.path} path={route.path} component={route.component} /> )}
				<Route exact path="/" render={() => <Redirect to="/case"/>} />
			</Switch>
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(Root, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
