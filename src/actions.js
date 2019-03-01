import {
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_INLINE_LOADER,
  HIDE_INLINE_LOADER,
  INTERFACE_REQUEST,
  INTERFACE_COMPLETE,
} from './action_types';

export const showSyncLoader = (args = {}) => {
  const { type = null, shouldTimeOut = null, timeOut = null } = args;
  return {
    type: SHOW_LOADER,
    payload: {
      type,
      ...(shouldTimeOut ? { shouldWaitToDisplay: true, timeOut } : {}),
    },
  };
};

export const hideSyncLoader = () => ({
  type: HIDE_LOADER,
});

export const showInlineLoader = (key = null) => ({
  type: SHOW_INLINE_LOADER,
  payload: {
    key,
  },
});

export const hideInlineLoader = (key = null) => ({
  type: HIDE_INLINE_LOADER,
  payload: {
    key,
  },
});

export const interfaceRequest = (args = {}) => {
  const { type = null, shouldTimeOut = null, timeOut = null } = args;
  return {
    type: INTERFACE_REQUEST,
    payload: {
      type,
      ...(shouldTimeOut ? { shouldWaitToDisplay: true, timeOut } : {}),
      async: true,
    },
  };
};

export const interfaceComplete = () => ({
  type: INTERFACE_COMPLETE,
});
