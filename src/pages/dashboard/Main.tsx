import * as React from 'react';
import { Link } from 'react-router-dom';
import { action, computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Layout, Button, Menu, Icon } from 'antd';

interface IProps {}
interface IState {}

@observer
class Main extends React.Component<IProps, IState> {
  @observable name = '';

  render() {
    return (
      <Layout>
        <Layout>
          <Layout.Content>
            {this.name}
            <Button
              onClick={() => {
                this.name = 'Thomas Jang';
              }}
            >
              set Name
            </Button>
            <Button
              onClick={() => {
                this.name = '';
              }}
            >
              clear Name
            </Button>
          </Layout.Content>
        </Layout>
        <Layout.Sider width={400} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            <Menu.SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />subnav 1
                </span>
              }
            >
              <Menu.Item key="1">option1</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="laptop" />subnav 2
                </span>
              }
            >
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="notification" />subnav 3
                </span>
              }
            >
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Layout.Sider>
      </Layout>
    );
  }
}

export default Main;
