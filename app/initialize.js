import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { reduxReactFirebase } from 'redux-react-firebase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './containers/App';
import PlaceDetail from './containers/PlaceDetail';
import AddPlace from './containers/AddPlace';
import reducers from './reducers';

//
// Material UI prerequisities
//

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

//
// Setup Firebase
//

const firebaseConfig = {
  apiKey: 'AIzaSyCXCTCNFNY5Dh_MhvAg1cDsMLyYLh1Jgec',
  authDomain: 'archpile-1599c.firebaseapp.com',
  databaseURL: 'https://archpile-1599c.firebaseio.com',
  storageBucket: '',
  messagingSenderId: '170078753831'
};

//
// Create the redux store
//

const initialState = undefined;
const store = createStore(
  reducers,
  initialState,
  compose(
    reduxReactFirebase(firebaseConfig),
    applyMiddleware(
      routerMiddleware(browserHistory)
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);


const history = syncHistoryWithStore(browserHistory, store);

const load = () => {
  ReactDOM.render(
    <MuiThemeProvider>
      <Provider store={store}>
        <Router history={history}>
          <Route path='/' component={App}>
            <Route path='hromada/:uid' component={PlaceDetail} />
            <Route path='nova-hromada/:lon/:lat' component={AddPlace} />
          </Route>
        </Router>
      </Provider>
    </MuiThemeProvider>,
    document.querySelector('#app')
  );
};

if (document.readyState !== 'complete') {
  document.addEventListener('DOMContentLoaded', load);
} else {
  load();
}
