import { action, extendObservable } from 'mobx';

const OBSERVABLE = {
  value: 1
};

class Demo {
  constructor() {
    extendObservable(this, {
      ...OBSERVABLE
    });
  }

  @action.bound reset() {
    Object.assign(this, OBSERVABLE);
  }

  @action.bound update(data) {
    Object.assign(this, data);
  }
}

export default new Demo();
