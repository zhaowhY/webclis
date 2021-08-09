import React, { Component } from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import loadable from '@loadable/component';

import { flatRoutes } from '@/router';

class Routes extends Component {
  render() {
    return (
      <Switch>
        {flatRoutes.map((route, index) => {
          const {
            exact = true, path, component, redirect
          } = route;
          if (redirect) {
            return (<Route
              exact={exact}
              key={index}
              path={path}
            >
              <Redirect to={redirect} />
            </Route>);
          }
          return (<Route
            path={path}
            exact={Boolean(exact)}
            key={index}
            render={(props) => {
              const Com = loadable(component);
              return (<Com {...props}></Com>);
            }}
          >

          </Route>);
        })}
      </Switch>
    );
  }
}

export default Routes;
