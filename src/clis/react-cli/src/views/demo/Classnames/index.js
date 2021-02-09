/** 接口测试页面 */
import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './index.module.less';

const classes = classNames.bind(styles);

class ClassNamesDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
      ]
    };
  }

  render() {
    const { data } = this.state;
    return (
      <div
        className={styles.wrapper}
      >
        {data.map((item, index) => <div
          key={index}
          className={classes(['weight',
            { 'even-content': index % 2 === 0 },
            { 'odd-content': index % 2 === 1 },
          ])}
        >
          {item}
        </div>)}

        <div className="gl-demo-font">全局样式使用示例，参考src/styles/index.less</div>
      </div>
    );
  }
}

export default ClassNamesDemo;
