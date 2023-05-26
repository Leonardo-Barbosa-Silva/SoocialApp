import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux'
import { store } from './store/index.js'
import {
  persistStore,
  persistReducer
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import usersReducers from './features/users/slice.js'
//import postsReducers from './features/posts/slice.js'


// REDUX PERSIST CONFIG
const persistConfig = { key: 'root', storage, version: 1 };
const usersReducersPersisted = persistReducer(persistConfig, usersReducers)
//const postsReducersPersisted = persistReducer(persistConfig, postsReducers)

// REDUX STORE CONFIG
const storeConfigured = store(usersReducersPersisted)


// REACT RENDER
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={storeConfigured}>
      <PersistGate loading={null} persistor={persistStore(storeConfigured)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
