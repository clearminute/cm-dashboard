// Externals - Others
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';

// Internals - Others
import './styles/clearminute.scss';
import ClearMinuteContainer from './_patterns/pages/clearminute/Container';
import ActivitiesContainer from './_patterns/pages/activities/Container';
import OverviewContainer from './_patterns/pages/overview/Container';
import store from './common/redux/store';
import { loadActivitiesActionsAsync } from 'clearminute/common/redux/asyncActionCreators';

function client() {
  async function secureUserData(nextState, replace, callback) {
    store.dispatch(loadActivitiesActionsAsync());
    return callback();
  }

  function onError(error) {
    console.info('state:', store.getState()); // eslint-disable-line no-console
    console.error('error:', error); // eslint-disable-line no-console

    // error might be a rejected failed action
    // when its error is logged, we can inspect the stack trace in dev tools
    if (error.error) {
      console.error('nested error:', error.error); // eslint-disable-line no-console
    }
  }

  const app = (
    <Provider store={store}>
      <React.Fragment>
        <Router history={hashHistory} onError={onError}>
          <Route path="/" component={ClearMinuteContainer} onEnter={secureUserData}>
            <IndexRoute component={OverviewContainer} />
            <Route path="/activities" component={ActivitiesContainer} />
          </Route>
        </Router>
      </React.Fragment>
    </Provider>
  );

  if (process.env.NODE_ENV !== 'production') {
    window.clearminute = {
      store,
    };
  }

  ReactDOM.render(app, document.getElementById('app'));
}

client();
