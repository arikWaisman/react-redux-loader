import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

import { LoaderFactory } from '../../src';

const mockStore = configureStore([]);

describe('Loader factory', () => {
  test('initially renders', () => {
    const initialState = { loader: {} };
    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <LoaderFactory />
      </Provider>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('renders with child loaders when action emited', () => {
    const initialState = {
      loader: {
        loaderType: 'TEST_LOADER',
        showLoader: true,
      },
    };
    const store = mockStore(initialState);

    const loaders = { TEST_LOADER: () => <div>Test Loader</div> };
    const wrapper = mount(
      <Provider store={store}>
        <LoaderFactory loadersByType={loaders} />
      </Provider>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
