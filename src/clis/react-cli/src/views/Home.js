/** 首页 */
import React, { Component } from 'react';
import logoImg from '@/assets/image/logo512.png';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <h1>首页</h1>
        <img
          src={logoImg}
          alt=""
          style={{ width: '40%' }}
        ></img>
      </div>
    );
  }
}

export default Home;
