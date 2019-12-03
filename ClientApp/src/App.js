import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Home } from './components/Home';
import { Layout } from './components/Layout';
import { Meta } from './components/Meta';
import { Chapter } from './components/Chapter';
import { Chapters } from './components/Chapters';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/meta' component={Meta} />
          <Route path='/chapters/:chapter' component={Chapter} />
          <Route path='/chapters' component={Chapters} />
        </Switch>
      </Layout>
    );
  }
}
