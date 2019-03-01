import { combineReducers } from 'redux';

import postReducer from './post_reducer';
import { loaderReducer } from 'react-redux-loader';

const rootReducer = combineReducers({
  post: postReducer,
  loader: loaderReducer,
});

export default rootReducer;
