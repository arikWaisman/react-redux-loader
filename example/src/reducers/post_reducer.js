import { POST_DATA_COMPLETE } from '../actions/types';

const removePostData = state => {
  delete state.id;
  delete state.userId;
  delete state.title;
  delete state.body;

  return state;
};

export default (state = {}, action) => {
  switch (action.type) {
    case POST_DATA_COMPLETE:
      return {
        ...state,
        ...action.payload,
      };

    // clean up post data when other loaders show
    case 'react-redux-modal/SHOW_LOADER':
    case 'react-redux-modal/INTERFACE_REQUEST':
      return removePostData(state);

    default:
      return state;
  }
};
