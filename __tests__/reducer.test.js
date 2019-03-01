import { loaderReducer, actionTypes } from '../src';

describe('Loader reducer', () => {
  describe('default case with initial state', () => {
    test('return default case', () => {
      const action = { type: 'FAKE_ACTION' };

      expect(loaderReducer(undefined, action)).toMatchSnapshot();
    });
  });

  describe('show sync loader', () => {
    test('returns the correct state', () => {
      const action = {
        type: actionTypes.SHOW_LOADER,
        payload: { type: 'FAKE_LOADER' },
      };

      expect(loaderReducer(undefined, action)).toMatchSnapshot();
    });
  });

  describe('hide sync loader', () => {
    test('returns the correct state', () => {
      const action = {
        type: actionTypes.HIDE_LOADER,
      };

      expect(loaderReducer(undefined, action)).toMatchSnapshot();
    });
  });

  describe('show and then hide sync loader', () => {
    test('returns the correct state', () => {
      const showAction = {
        type: actionTypes.SHOW_LOADER,
        payload: { type: 'FAKE_LOADER' },
      };

      const hideAction = {
        type: actionTypes.HIDE_LOADER,
      };

      const stateAfterShow = loaderReducer(undefined, showAction);
      expect(loaderReducer(stateAfterShow, hideAction)).toMatchSnapshot();
    });
  });

  describe('show inline loader', () => {
    test('returns the correct state', () => {
      const action = {
        type: actionTypes.SHOW_INLINE_LOADER,
        payload: { key: 'FAKE_INLINE_LOADER_KEY' },
      };

      expect(loaderReducer(undefined, action)).toMatchSnapshot();
    });
  });

  describe('hide inline loader', () => {
    test('returns the correct state', () => {
      const action = {
        type: actionTypes.HIDE_INLINE_LOADER,
        payload: { key: 'FAKE_INLINE_LOADER_KEY' },
      };

      expect(loaderReducer(undefined, action)).toMatchSnapshot();
    });
  });

  describe('show and then hide inline loader', () => {
    test('returns the correct state', () => {
      const showAction = {
        type: actionTypes.SHOW_INLINE_LOADER,
        payload: { key: 'FAKE_INLINE_LOADER_KEY' },
      };

      const hideAction = {
        type: actionTypes.HIDE_INLINE_LOADER,
        payload: { key: 'FAKE_INLINE_LOADER_KEY' },
      };

      const stateAfterShow = loaderReducer(undefined, showAction);
      expect(loaderReducer(stateAfterShow, hideAction)).toMatchSnapshot();
    });
  });

  describe('show async loader with an interface request', () => {
    test('returns the correct state', () => {
      const action = {
        type: actionTypes.INTERFACE_REQUEST,
        payload: { type: 'FAKE_LOADER' },
      };

      expect(loaderReducer(undefined, action)).toMatchSnapshot();
    });
  });

  describe('interface complete returns proper state', () => {
    test('returns the correct state', () => {
      const action = {
        type: actionTypes.INTERFACE_COMPLETE,
      };

      expect(loaderReducer(undefined, action)).toMatchSnapshot();
    });
  });

  describe('interface error returns proper state', () => {
    test('returns the correct state', () => {
      const action = {
        type: actionTypes.INTERFACE_ERROR,
        error: 'some fake error',
      };

      expect(loaderReducer(undefined, action)).toMatchSnapshot();
    });
  });

  describe('show async loader with more than one request and ensure complete decrements ', () => {
    test('returns the correct state', () => {
      const showAction = {
        type: actionTypes.INTERFACE_REQUEST,
        payload: { type: 'FAKE_LOADER' },
      };

      const hideAction = {
        type: actionTypes.INTERFACE_COMPLETE,
        payload: { key: 'FAKE_INLINE_LOADER_KEY' },
      };

      const stateAfterFirstShow = loaderReducer(undefined, showAction);
      const stateAfterSecondShow = loaderReducer(
        stateAfterFirstShow,
        showAction,
      );

      expect(loaderReducer(stateAfterSecondShow, hideAction)).toMatchSnapshot();
    });
  });
});
