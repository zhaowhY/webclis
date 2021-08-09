import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import {
  HashRouter as Router,
} from 'react-router-dom';
import store from '@/store';
import PersistMobx from '@/store/PersistMobx';
import Layout from '@/components/Layout';

class App extends Component {
  render() {
    return (
      <>
        <Provider {...store}>
          <Router>
            <Layout></Layout>
          </Router>
          <PersistMobx></PersistMobx>
        </Provider>
      </>
    );
  }
}

export default App;
