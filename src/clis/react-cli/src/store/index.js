import demo from './demo';

const store = {
  demo
};

export default store;

window.getStore = (name) => store[name] || store;;
