import React, { Component } from 'react';
import {
  Button
} from 'antd';
import Routes from '@/router/Routes';

import SideBar from './SideBar';
import styles from './index.module.less';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarVisible: true
    };
  }

  hideSidebar = () => {
    this.setState({
      sidebarVisible: false
    });
  };

  render() {
    const { sidebarVisible } = this.state;

    return (
      <div className={styles.layout}>
        {sidebarVisible && (<div className={styles['layout-sidebar']}>
          <Button
            type="primary"
            style={{ margin: 16 }}
            onClick={this.hideSidebar}
          >
            隐藏左边导航栏
          </Button>
          <SideBar></SideBar>
        </div>)}

        <div className={styles['layout-content']}>
          <Routes></Routes>
        </div>
      </div>
    );
  }
}

export default Layout;
