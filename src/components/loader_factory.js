import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class LoaderFactory extends Component {
  constructor(props) {
    super(props);

    this.timer = null;

    this.state = {
      readyToDisplay: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    // set state readyToDisplay if we just finished displaying a timed out loader so it can be ready for the next one
    if (!props.shouldWaitToDisplay && state.readyToDisplay) {
      return {
        readyToDisplay: false,
      };
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    // if this is meant to be a timed out loader and a loader isn't currently displayed
    // set the timeout and display loader after 500 milliseconds, as long as a timer has not yet been set
    if (
      this.props.shouldWaitToDisplay &&
      !this.state.readyToDisplay &&
      !this.timer
    ) {
      // if this is set we need to wipe it out before setting a new timeout. Otherwise the
      // clearTimeout we call when we no longer want to display a loader and clean up will be using the wrong
      // timer id that is returned from setTimeout
      this.timer = setTimeout(() => {
        // have to check for this again inside this function before firing action to
        // show loader so it doesn't get triggered when no longer needed
        this.setState({
          readyToDisplay: true,
        });

        // clear the timer after we set state to display the loader finally so it can be used again
        // for other timed out requests
        clearInterval(this.timer);
        this.timer = null;
      }, this.props.timeOut || 500);
    }

    // if shouldWaitToDisplay was true and then changed to false, then we know that the request
    // tied to our timed out loader has completed and we should clear the timeout so it will work properly for
    // subsequent timed out request loaders
    if (
      prevProps.shouldWaitToDisplay &&
      !this.props.shouldWaitToDisplay &&
      this.timer
    ) {
      // console.log('clearing timeout', this.timer);
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  render() {
    const {
      requests,
      loaderType,
      loadersByType,
      shouldWaitToDisplay,
      showLoader,
      async,
    } = this.props;

    // set to default loader if not set
    const loaderTypeKey = loaderType || 'DEFAULT';

    // return null if were not showing loader
    if ((!async && !showLoader) || (async && requests < 1)) {
      return null;
    }

    // show loader
    const LoaderComponent = loadersByType[loaderTypeKey];

    // offset displaying loader if this is a loader that should wait for a period of time
    // before mounting and rendering.
    if (shouldWaitToDisplay) {
      return this.state.readyToDisplay ? (
        <LoaderComponent {...this.props} />
      ) : null;
    }

    return <LoaderComponent {...this.props} />;
  }
}

// have to rename showLoader to show because we have a prop that comes in under the
// same key
export default connect(
  state => state.loader,
  actions,
)(LoaderFactory);
