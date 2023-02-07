import { createStore } from 'redux';
import authReducer from './authReducer';
import SecureLS from 'secure-ls';

const secureLs = new SecureLS();

const getStateFromStorage = () => {
  const teamAuth = secureLs.get('team-auth');

  let stateInLocalStorage = {
    isLoggedIn: false,
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined
  };

  if (teamAuth) {
    return teamAuth;
  }

  return stateInLocalStorage;
};

const updateStateInStorage = newState => {
  secureLs.set('team-auth', newState);
};

const configureStore = () => {
  const store = createStore(authReducer, 
    getStateFromStorage(), 
    window.__REDUX_DEVTOOLS_EXTENSION__ && 
    window.__REDUX_DEVTOOLS_EXTENSION__());

  store.subscribe(() => {
    updateStateInStorage(store.getState());
  });

  return store;
};

export default configureStore;