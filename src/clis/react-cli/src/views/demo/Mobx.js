/** 接口测试页面 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from 'antd';

@inject('demo')
@observer
class DemoAPI extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  updateName = () => {
    const { demo: { update, value } } = this.props;
    update({ value: value + 1 });
  }

  render() {
    const { demo: { value } } = this.props;
    return (
      <div>
        <Button type="primary" onClick={this.updateName}>点击增加value值</Button>
        <h2>
          mobx/demo的value值:
          {' '}
          <span style={{ color: 'green' }}>{value}</span>
        </h2>

      </div>
    );
  }
}

export default DemoAPI;
