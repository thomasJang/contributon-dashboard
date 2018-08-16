import { types, getSnapshot, applySnapshot, flow } from 'mobx-state-tree';
import ApiProvider from '../providers/ApiProvider';
import GitStore from './GitStore';

const AlertMessage = types.model('Alert', {
  message: types.string,
  messageType: types.enumeration('type', [
    'success',
    'info',
    'warning',
    'error',
  ]),
});

type IAlertMessageType = typeof AlertMessage.Type;
export interface IAlertMessage extends IAlertMessageType {}

export const AppStore = types
  .model('AppStore', {
    gitStore: types.optional(GitStore, { projects: [], log: [] }),
    spinning: types.boolean,
    spinningTip: types.string,
    alertMessages: types.array(AlertMessage),
    loaded: types.boolean,
  })
  .actions(self => {
    /*
    const init = flow(function*() {
      yield self.gitStore.init();
      self.loaded = true;
      return {};
    });
    */
    const init = function() {
      self.gitStore.init();
      self.loaded = true;
      return {};
    };

    function setSpinning(value: boolean, tip?: string) {
      self.spinning = value;
      self.spinningTip = tip || '';
    }

    function alert(
      message: string,
      messageType: 'success' | 'info' | 'warning' | 'error' = 'error',
    ) {
      self.alertMessages.push({
        message,
        messageType,
      });
    }

    function alertClear() {
      self.alertMessages.clear();
    }

    return {
      init,
      setSpinning,
      alert,
      alertClear,
    };
  });

type IAppStoreType = typeof AppStore.Type;
export interface IAppStore extends IAppStoreType {}

const appStore = AppStore.create(
  {
    spinning: false,
    spinningTip: '',
    alertMessages: [],
    loaded: false,
  },
  { provider: ApiProvider },
);

appStore.init();

export default appStore;
