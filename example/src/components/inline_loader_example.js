import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { actions as loaderActions } from 'react-redux-loader';

import SmallSpinner from './loaders/small_spinning_loader';

const inlineLoaders = {
  inlineLoader1: <SmallSpinner />,
  inlineLoader2: <SmallSpinner />,
};

class InlineLoader extends Component {
  state = {};

  renderResults = (loaderKey, stateKey) => {
    if (this.props.displayRegisteredInlineLoaders[loaderKey]) {
      return inlineLoaders[loaderKey];
    }

    return this.state[stateKey] && this.state[stateKey];
  };

  calculate = (e, value, loaderKey, stateKey) => {
    this.props.showInlineLoader(loaderKey);

    this.setState({
      [stateKey]: null,
    });

    return setTimeout(() => {
      this.setState({
        [stateKey]: 2 * value,
      });
      this.props.hideInlineLoader(loaderKey);
    }, 6000);
  };

  render() {
    return (
      <Fragment>
        <div className="inline-loader-wrap">
          <p>
            2 * 2 is =
            <span>{this.renderResults('inlineLoader1', 'example1')}</span>
          </p>
          <button
            className="waves-effect waves-light btn"
            onClick={e => this.calculate(e, 2, 'inlineLoader1', 'example1')}
          >
            result
          </button>
        </div>
        <div className="inline-loader-wrap">
          <p>
            2 * 3 is =
            <span>{this.renderResults('inlineLoader2', 'example2')}</span>
          </p>
          <button
            className="waves-effect waves-light btn"
            onClick={e => this.calculate(e, 3, 'inlineLoader2', 'example2')}
          >
            result
          </button>
        </div>
      </Fragment>
    );
  }
}

const inlineLoadersDisplaySelector = state => {
  return Object.keys(inlineLoaders).reduce((obj, loaderKey) => {
    if (state.loader.inline.indexOf(loaderKey) > -1) {
      return {
        ...obj,
        [loaderKey]: true,
      };
    }

    return {
      ...obj,
      [loaderKey]: false,
    };
  }, {});
};

const mapStateToProps = state => {
  return {
    displayRegisteredInlineLoaders: inlineLoadersDisplaySelector(state),
  };
};

export default connect(
  mapStateToProps,
  loaderActions,
)(InlineLoader);
