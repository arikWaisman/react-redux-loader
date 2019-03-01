import {
  INTERFACE_REQUEST,
  INTERFACE_COMPLETE,
  INTERFACE_ERROR,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_INLINE_LOADER,
  HIDE_INLINE_LOADER,
} from './action_types';

const INITIAL_STATE = {
  requests: 0,
  showLoader: null,
  error: null,
  loaderType: null,
  shouldWaitToDisplay: false,
  timeOut: null,
  async: false,
  inline: [],
};

// keep loader type if already one open
const getLoaderType = (requestedType = null, state) =>
  state.requests > 0 ? state.loaderType : requestedType;

// remove an inline loader from inline list
const updateInlineLoaders = (loaderToRemove, state) => {
  const indexToRemove = state.inline.indexOf(loaderToRemove);

  return state.inline.filter((key, index) => index !== indexToRemove);
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case INTERFACE_REQUEST:
      return {
        ...state,
        requests: state.requests + 1,
        loaderType: getLoaderType(action.payload.type, state),
        shouldWaitToDisplay:
          action.payload.shouldWaitToDisplay || state.shouldWaitToDisplay,
        timeOut: action.payload.timeOut || state.timeOut,
        async: true,
      };

    case INTERFACE_COMPLETE:
      return {
        ...state,
        requests: state.requests - 1,
        ...(state.requests - 1 > 0
          ? {}
          : {
              shouldWaitToDisplay: false,
              timeOut: null,
              async: false,
              showLoader: false,
            }),
      };

    case SHOW_LOADER:
      return {
        ...state,
        showLoader: true,
        loaderType: action.payload.type,
        shouldWaitToDisplay:
          action.payload.shouldWaitToDisplay || state.shouldWaitToDisplay,
        timeOut: action.payload.timeOut || state.timeOut,
      };

    case HIDE_LOADER:
      return { ...state, showLoader: false, async: false, loaderType: null };

    case SHOW_INLINE_LOADER:
      return { ...state, inline: [...state.inline, action.payload.key] };

    case HIDE_INLINE_LOADER:
      return {
        ...state,
        inline: updateInlineLoaders(action.payload.key, state),
      };

    case INTERFACE_ERROR:
      return { ...state, error: action.error };

    default:
      return state;
  }
}
