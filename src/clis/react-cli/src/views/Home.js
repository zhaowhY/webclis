/** 首页 */
import React, { Component } from 'react';
import logoImg from '@/assets/image/logo512.png';
import SvgIcon from 'src/components/SvgIcon';

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

        <SvgIcon
          name="icon"
          style={{
            width: 100,
            height: 100,
            border: '1px solid red',
            color: 'red'
          }}
        ></SvgIcon>
      </div>
    );
  }
}

export default Home;
