import React, { Component } from 'react';
import {
  Menu
} from 'antd';
import { withRouter } from 'react-router-dom';
import { layoutRoutes } from '@/router';
import componentIcon from '@/assets/menu/component';

const { SubMenu } = Menu;

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  menuSelect = ({ key }) => {
    const { history } = this.props;
    history.push(key);
  }

  formatImg = (icon) => {
    if (!icon || !icon.name) return;
    const { type = 'img', name } = icon;
    if (type === 'component') return componentIcon[name];
    if (type === 'img') {
      return (<img
        src={require(`@/assets/menu/image/${name}`).default}
        alt=""
        style={{
          height: 14, marginRight: 10, lineHeight: 19, marginBottom: 3
        }}
      ></img>);
    }
  }

  formatLayoutMenu = (routes) => routes.map((item) => {
    const {
      children, path, name, icon
    } = item;
    if ((children || []).length > 0) {
      return (
        <SubMenu
          key={path}
          icon={this.formatImg(icon)}
          title={name}
        >
          {this.formatLayoutMenu(children)}
        </SubMenu>
      );
    }
    return (
      <Menu.Item key={path} icon={this.formatImg(icon)}>
        {name}
      </Menu.Item>
    );
  })

  render() {
    const { collapsed } = this.state;
    return (
      <div>
        <Menu
          theme="dark"
          mode="inline"
          onSelect={this.menuSelect}
          inlineCollapsed={collapsed}
        >
          {this.formatLayoutMenu(layoutRoutes)}
        </Menu>
      </div>
    );
  }
}

export default withRouter(Sidebar);
