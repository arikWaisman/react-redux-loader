import React from 'react';
import { connect } from '../../../node_modules/react-redux';

const OtherLoader = props => {
  return (
    <div>
      Other loader that is connected to redux and registered from the inside
      your project...
      <br />
      Loader type from redux store: {props.loaderType}
    </div>
  );
};
export default connect(state => state.loader)(OtherLoader);
