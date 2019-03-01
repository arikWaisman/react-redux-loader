import axios from 'axios';
import { POST_DATA_REQUEST, POST_DATA_COMPLETE } from './types';
import { actions as loaderActions } from 'react-redux-loader';

export const getRemotePostData = () => {
  return dispatch => {
    console.log(loaderActions);
    dispatch(
      loaderActions.interfaceRequest({
        type: 'SPINNING_LOADER',
      }),
    );

    dispatch({
      type: POST_DATA_REQUEST,
    });

    // timeout to give loader a chance to display
    setTimeout(() => {
      axios
        .get(`https://jsonplaceholder.typicode.com/posts/1`)
        .then(res => {
          dispatch({
            type: POST_DATA_COMPLETE,
            payload: res.data,
          });
          dispatch(loaderActions.interfaceComplete());
        })
        .catch(err => console.log);
    }, 1500);
  };
};
