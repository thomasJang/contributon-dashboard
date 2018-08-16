import * as React from 'react';
import { action, computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { IAppStore, IAlertMessage } from 'stores/AppStore';
import { II18nStore } from 'stores/I18nStore';
import { Button, Modal, Divider } from 'antd';

interface IAppProps {
  appStore?: IAppStore;
  i18nStore?: II18nStore;
}

@inject('appStore', 'i18nStore')
@observer
class Create extends React.Component<IAppProps> {
  alertClear = () => {
    const { alertClear } = this.props.appStore;
    alertClear();
  };
  handleOk = () => {
    // console.log('ok');
    this.alertClear();
  };
  handleCancel = () => {
    // console.log('cancel');
    this.alertClear();
  };

  render() {
    const { alertMessages } = this.props.appStore;
    const { t } = this.props.i18nStore;

    if (alertMessages.length === 0) {
      return null;
    }

    return (
      <Modal
        width={400}
        visible={true}
        title={'Contirubuton Dashboard'}
        onCancel={this.handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={this.handleOk}>
            OK
          </Button>,
        ]}
      >
        {alertMessages.map((m: IAlertMessage, mIndex: number) => {
          return (
            <React.Fragment key={mIndex}>
              {mIndex ? <Divider /> : null}
              <p className={m.messageType}>{m.message}</p>
            </React.Fragment>
          );
        })}
      </Modal>
    );
  }
}

export default Create;
