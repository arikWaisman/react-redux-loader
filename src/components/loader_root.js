import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import LoaderContext from '../loader_context';
import LoaderFactory from './loader_factory';

export default (store, loadersByType = {}, mountLoaderRoot = null) => {
  if (!store) {
    throw Error('store has to be passed into loader root!');
  }

  class LoaderRoot extends Component {
    componentDidMount() {
      this.loaderTarget = document.createElement('div');
      this.loaderTarget.className = 'full-loader';
      this.loaderTarget.setAttribute('data-testid', 'loader-root');

      // if callback is passed we can mount our loader root elsewhere in the DOM
      if (mountLoaderRoot) {
        mountLoaderRoot(this.loaderTarget);
      } else {
        document.body.append(this.loaderTarget);
      }

      this.mountToDOM();
    }

    componentWillUpdate() {
      this.mountToDOM();
    }

    componentWillUnmount() {
      ReactDOM.unmountComponentAtNode(this.loaderTarget);
      document.body.removeChild(this.loaderTarget);
    }

    mountToDOM() {
      ReactDOM.render(
        <Provider store={store} context={LoaderContext}>
          <LoaderFactory
            context={LoaderContext}
            loadersByType={{
              DEFAULT: () => <div>LOADING...</div>,
              ...loadersByType,
            }}
          />
        </Provider>,
        this.loaderTarget,
      );
    }

    render() {
      return <noscript />;
    }
  }

  return LoaderRoot;
};
