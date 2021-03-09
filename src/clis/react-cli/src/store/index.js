import React from 'react';
import demo from './demo';

const store = {
  demo
};

export default store;

window.useStore = (name) => {
  const storeContext = React.createContext(store[name] || store);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return React.useContext(storeContext);
};
