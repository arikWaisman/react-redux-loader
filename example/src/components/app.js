import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { actions as loaderActions } from 'react-redux-loader';

import CardWrap from './card_wrap';
import PostResults from './post_results';
import InlineLoader from './inline_loader_example';

class App extends Component {
  state = {
    post: null,
  };

  render() {
    return (
      <div className="container">
        {this.props.loader.showLoader && (
          <button
            className="waves-effect waves-light btn red hide-loader"
            onClick={() => this.props.hideSyncLoader()}
          >
            Hide Loader
          </button>
        )}
        <h1>React Redux Loaders</h1>

        <CardWrap>
          <h3>Global Synchronous Loaders</h3>
          <div className="btn-wrap">
            <button
              className="waves-effect waves-light btn"
              onClick={() => this.props.showSyncLoader()}
            >
              DEFAULT LOADER
            </button>
          </div>
          <div className="btn-wrap">
            <button
              className="waves-effect waves-light btn"
              onClick={() =>
                this.props.showSyncLoader({ type: 'OTHER_LOADER' })
              }
            >
              OTHER LOADER
            </button>
          </div>
          <div className="btn-wrap">
            <button
              className="waves-effect waves-light btn"
              onClick={() =>
                this.props.showSyncLoader({
                  type: 'OTHER_LOADER',
                  shouldTimeOut: true,
                  timeOut: 1000,
                })
              }
            >
              TIMED OUT LOADER
            </button>
          </div>
        </CardWrap>
        <CardWrap>
          <h3>Global Asynchronous Loaders</h3>

          <div className="btn-wrap">
            <button
              className="waves-effect waves-light btn"
              onClick={this.props.getRemotePostData}
            >
              ASYNC LOADER - Get Remote Post Data
            </button>
          </div>
          <PostResults post={this.props.post} />
        </CardWrap>
        <CardWrap>
          <h3>Inline Loaders</h3>

          <InlineLoader />
        </CardWrap>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loader: state.loader,
    post: state.post,
  };
};

export default connect(
  mapStateToProps,
  { ...actions, ...loaderActions },
)(App);
