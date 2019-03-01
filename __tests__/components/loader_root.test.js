import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { render, cleanup } from 'react-testing-library';

import { makeLoaderRoot } from '../../src';

const mockStore = configureStore([]);

describe('Loader root', () => {
  beforeEach(cleanup);

  test('renders and mount html', () => {
    const store = mockStore({ loader: {} });
    const LoaderRoot = makeLoaderRoot(store);

    const fakeMountToDom = jest.spyOn(LoaderRoot.prototype, 'mountToDOM');
    const wrapper = shallow(<LoaderRoot />);
    const { getByTestId } = render(<LoaderRoot />);

    // make sure our initial render method returns correctly
    expect(toJson(wrapper)).toMatchSnapshot();

    // make sure our mounting function is called
    expect(fakeMountToDom).toHaveBeenCalled();

    // make sure our mounted html returns correctly
    expect(getByTestId('loader-root')).toMatchSnapshot();
  });
});
