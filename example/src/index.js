import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import App from './components/app';

import * as loaders from './components/loaders';

import { makeLoaderRoot } from 'react-redux-loader';

import * as serviceWorker from './serviceWorker';

import './index.scss';

const mountLoaderRoot = loaderContainer => {
  document.body.prepend(loaderContainer);
};
const LoaderRoot = makeLoaderRoot(store, loaders, mountLoaderRoot);

const Root = () => (
  <Fragment>
    <Provider store={store}>
      <App />
    </Provider>
    <LoaderRoot />
  </Fragment>
);

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
