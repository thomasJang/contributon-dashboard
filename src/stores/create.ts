import { observable } from 'mobx';
import appStore from './AppStore';
import i18nStore from './I18nStore';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';

function prepareStore(storeInstance: any, newStore: any) {
  storeInstance.set(newStore);
}

// To support HMR of store, this ref holds the latest loaded store.
const appStoreInstance = observable.box(null);
const i18nStoreInstance = observable.box(null);

prepareStore(appStoreInstance, appStore);
prepareStore(i18nStoreInstance, i18nStore);

export { appStoreInstance, i18nStoreInstance };

const _module: any = module;
if (_module.hot) {
  if (_module.hot.data && _module.hot.data.appStore) {
    const _appStore = require('./AppStore').default;
    applySnapshot(_appStore, _module.hot.data.appStore);
    prepareStore(appStoreInstance, _appStore);
  }
  if (_module.hot.data && _module.hot.data.i18nStore) {
    const _i18nStore = require('./I18nStore').default;
    applySnapshot(_i18nStore, _module.hot.data.i18nStore);
    prepareStore(i18nStoreInstance, _i18nStore);
  }
  _module.hot.dispose((data: any) => {
    data.appStore = getSnapshot(appStore);
    data.i18nStore = getSnapshot(i18nStore);
  });
}
