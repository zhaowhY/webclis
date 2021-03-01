// mobx持久化插件 (利用session)
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { reaction, toJS } from 'mobx';

const injectUnits = ['demo'];
@inject(...injectUnits)
@observer
class PersistMobx extends Component {
  constructor(props) {
    super(props);
    this.initReaction();
  }

  componentWillUnmount() {
    // 卸载reaction实例
    if (this.reactionInstance) {
      this.reactionInstance.forEach(item => item.dispose());
    }
  }

  initMobxData = (unit) => {
    const { [unit]: { update } } = this.props;

    try {
      const initData = JSON.parse(sessionStorage.getItem(unit)) || {};
      update(initData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`session ${unit} value is not normative`);
    }
  }

  initReaction = () => {
    this.reactionInstance = [];
    injectUnits.forEach((unit, index) => {
      this.initMobxData(unit);
      reaction(
        // eslint-disable-next-line react/destructuring-assignment
        () => toJS(this.props[unit]),
        (data, instance) => {
          sessionStorage.setItem(unit, JSON.stringify(data));
          this.reactionInstance[index] = instance;
        },
        {
          fireImmediately: false
        }
      );
    });
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default PersistMobx;
