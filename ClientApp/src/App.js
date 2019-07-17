import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Meta } from './components/Meta';
import { Index } from './components/chapters/Index';
import { Prologue } from './components/chapters/Prologue';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/meta' component={Meta} />
        <Route path='/chapters/index' component={Index} />
        <Route path='/chapters/prologue' component={Prologue} />
      </Layout>
    );
  }
}
