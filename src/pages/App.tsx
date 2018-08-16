import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { NoMatch, ErrorBoundary, AlertModal } from 'components';
import 'styles/globals';
import { IAppStore } from 'stores/AppStore';
import { Spin, Icon, Modal, Button } from 'antd';
import { Main, About } from 'pages/dashboard';

interface IProps {
  appStore?: IAppStore;
}
const antIcon = <Icon type="loading" style={{ fontSize: 32 }} spin />;

@inject('appStore')
@observer
class App extends React.Component<IProps> {
  render() {
    const { spinning, spinningTip } = this.props.appStore;

    return (
      <ErrorBoundary>
        <BrowserRouter>
          <Spin
            indicator={antIcon}
            spinning={spinning}
            size="large"
            tip={spinningTip}
          >
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
            <AlertModal />
          </Spin>
        </BrowserRouter>
      </ErrorBoundary>
    );
  }
}

export default hot(module)(App);
