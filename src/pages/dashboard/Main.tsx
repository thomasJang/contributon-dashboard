import * as React from 'react';
import { Link } from 'react-router-dom';
import { action, computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Layout, Button, Menu, Icon, Card, Row, Col } from 'antd';
import styled from 'styled-components';

const StyledLayoutContent = styled(Layout.Content)`
  height: 100vh;
  padding: 2vh;
`;

const PaddedCol = styled(Col as any)`
  padding: 1vh;
`;

const Project = styled.div`
  height: 22vh;
  background: #fff;
  padding: 20px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
`;

const StyledLayoutSider = styled(Layout.Sider)`
  background: #002140;
  padding: 20px;
  h2 {
    color: #fff;
  }
`;

import { IAppStore } from 'stores/AppStore';
import { II18nStore } from 'stores/I18nStore';

interface IProps {
  appStore?: IAppStore;
  i18nStore?: II18nStore;
}
interface IState {}

@inject('appStore', 'i18nStore')
@observer
class Main extends React.Component<IProps, IState> {
  @observable name = '';

  render() {
    const { appStore } = this.props;
    const { gitStore } = appStore;
    const { projects, log } = gitStore;

    return (
      <Layout>
        <Layout>
          <StyledLayoutContent>
            <Row>
              {projects.map((n, nidx) => {
                return (
                  <PaddedCol key={nidx} xs={24} lg={12} xl={6} xxl={6}>
                    <Project>
                      <h3>{n.projectName}</h3>
                      <p>{n.Repository}</p>
                    </Project>
                  </PaddedCol>
                );
              })}
            </Row>
          </StyledLayoutContent>
        </Layout>
        <StyledLayoutSider width={400}>
          <h2>Events</h2>
        </StyledLayoutSider>
      </Layout>
    );
  }
}

export default Main;
