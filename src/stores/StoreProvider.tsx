import * as React from 'react';
import { Provider as MobxProvider, observer } from 'mobx-react';
import { hot } from 'react-hot-loader';
import { appStoreInstance, i18nStoreInstance } from 'stores/create';

const StoreProvider = observer(props => {
  return (
    <MobxProvider
      appStore={appStoreInstance.get()}
      i18nStore={i18nStoreInstance.get()}
    >
      {props.children}
    </MobxProvider>
  );
});

export default hot(module)(StoreProvider);
