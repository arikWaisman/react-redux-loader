import configureStore from 'redux-mock-store';
import { actions } from '../src';

describe('Actions test', () => {
  const mockStore = configureStore([]);
  const store = mockStore({});

  beforeEach(() => store.clearActions());

  describe('Show sync loader', () => {
    test('dispatches proper action and payload', () => {
      store.dispatch(actions.showSyncLoader({ type: 'LOADER_TEST' }));
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe('Hide sync loader', () => {
    test('dispatches proper action and payload', () => {
      store.dispatch(actions.hideSyncLoader({ type: 'HIDE_LOADER' }));
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe('Show inline loader', () => {
    test('dispatches proper action and payload', () => {
      store.dispatch(actions.showInlineLoader({ type: 'SHOW_INLINE_LOADER' }));
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe('Hide inline loader', () => {
    test('dispatches proper action and payload', () => {
      store.dispatch(actions.hideInlineLoader({ type: 'HIDE_INLINE_LOADER' }));
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe('Interface request', () => {
    test('dispatches proper action and payload', () => {
      store.dispatch(actions.interfaceRequest({ type: 'INTERFACE_REQUEST' }));
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe('Interface complete', () => {
    test('dispatches proper action and payload', () => {
      store.dispatch(actions.interfaceComplete({ type: 'INTERFACE_COMPLETE' }));
      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
