import { createStore } from 'redux';
import authReducer from './authReducer';

const configureStore = () => {
  const teamAuth = localStorage.getItem('team-auth');

  let stateInLocalStorage = {
    isLoggedIn: false,
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined
  };

  if (teamAuth) {
    try {
      stateInLocalStorage = JSON.parse(teamAuth);
    } catch (error) {}
  }

  const store = createStore(authReducer, stateInLocalStorage, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  store.subscribe(() => {
    localStorage.setItem('team-auth', JSON.stringify(store.getState()));
  });

  return store;
};

export default configureStore;