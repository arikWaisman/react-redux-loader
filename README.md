# react-redux-loader ([example](https://arikwaisman.github.io/react-redux-loader/))
> React-Redux loaders for controlling loader display with redux state

 ## Install

```bash
npm install --save react-redux-loader
```


## Usage

Check out the [example](https://arikwaisman.github.io/react-redux-loader/) in the [example folder](https://github.com/arikWaisman/react-redux-loader).

**Step 1.** Call `makeLoaderRoot` with your store, your customized loaders and the mounting callback function (if you need to control where in the DOM your root mounts) passed into it, the resulting component is your loader root component.


```jsx
// ./index.js
import store from './store';
import { makeLoaderRoot } from 'react-redux-loader';
import * as modalComponents from './modal_components';

const mountLoaderRoot = loaderContainer => {
  document.body.prepend(loaderContainer);
};
const LoaderRoot = makeLoaderRoot(store, loaders, mountLoaderRoot);

const Root = () => (
  <Fragment>
    <Provider store={store}>
      <App />
    </Provider>
     <LoaderRoot />
  </Fragment>
);
```

```jsx
// ./components/loaders
import OtherLoader from './other_loader';
import Spinner from './spinning_loader';

export const OTHER_LOADER = OtherLoader;
export const SPINNING_LOADER = Spinner;
```

**Step 2.** Add the loader reducer to your project under the key `loader`.


```jsx
import { combineReducers } from 'redux';

import { loaderReducer } from 'react-redux-loader';

const rootReducer = combineReducers({
  loader: loaderReducer,
});

export default rootReducer;
```

**Step 3.** Wire up the provided action creators into your app where appropriate. These can be used in your components or anywhere in your app to dispatch events.


```jsx
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { actions as loaderActions } from 'react-redux-loader';

class App extends Component {
  
  render() {
    return (
      <Fragment>
        <div>
          <button onClick={() => this.props.showSyncLoader()}>
            DEFAULT LOADER
          </button>
        </div>
        <div>
          <button onClick={() => this.props.hideSyncLoader()} >
            Hide Loader
          </button>
        </div>
      </Fragment>
    );
  }
}
export default connect(
  null,
  { ...actions, ...loaderActions },
)(App);

```
## Components

### Component Factory: **makeLoaderRoot()**

arguments:

| Property | Type | Required | Default | Description |
|:--------------|:--------------|:--------------|:--------------|:--------------|
| `store` | object | Required | undefined | Pass in the redux store. |
| `loaders` | object | Optional | undefined | Optionally pass a your own loader components. |
| `mountLoaderRoot` | function | Optional | undefined | callback to change where the in the DOM the loader root mounts. |


## Action Creators

Available action creators.

### showSyncLoader(args = {}):

available arguments:

| Key | Type | Required | Default | Description |
|:--------------|:--------------|:--------------|:--------------|:--------------|
| `type` | string | Optional | null | The type of loader that should display registered with makeLoaderRoot. |
| `shouldTimeOut` | bool | Optional | null | Should this loader wait to display. |
| `timeOut` | int | Optional | null | How long the loader should wait before displaying in MS. |

### hideSyncLoader():

available arguments:

none

### showInlineLoader(key = null):

available arguments:

| Key | Type | Required | Default | Description |
|:--------------|:--------------|:--------------|:--------------|:--------------|
| `key` | string | Required | null | The key of the inline loader to display. |

### hideInlineLoader(key = null):

available arguments:

| Key | Type | Required | Default | Description |
|:--------------|:--------------|:--------------|:--------------|:--------------|
| `key` | string | Required | null | The key of the inline loader to hide. |

### interfaceRequest(args = {}):

available arguments:

| Key | Type | Required | Default | Description |
|:--------------|:--------------|:--------------|:--------------|:--------------|
| `type` | string | Optional | null | The type of loader that should display registered with makeLoaderRoot. |
| `shouldTimeOut` | bool | Optional | null | Should this loader wait to display. |
| `timeOut` | int | Optional | null | How long the loader should wait before displaying in MS. |

### interfaceComplete():

available arguments:

none

## License

MIT
