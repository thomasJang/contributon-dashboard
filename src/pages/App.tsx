import * as React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { NoMatch, ErrorBoundary } from 'components';
import { Layout } from 'antd';

import 'styles/globals';

import { Main, About } from 'pages/dashboard';

class App extends React.Component {
  state = {};

  render() {
    return (
      <ErrorBoundary>
        <BrowserRouter>
          <Layout>
            <Layout>
              <Layout.Content>
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => <Redirect to="/dashboard" />}
                  />
                  <Route path="/dashboard" component={Main} />
                  <Route path="/about" component={About} />
                  <Route component={NoMatch} />
                </Switch>
              </Layout.Content>
            </Layout>
          </Layout>
        </BrowserRouter>
      </ErrorBoundary>
    );
  }
}

export default hot(module)(App);
