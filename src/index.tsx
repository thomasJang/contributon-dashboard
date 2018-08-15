import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import StoreProvider from 'stores/StoreProvider';
import App from 'pages/App';

ReactDOM.render(
  <CookiesProvider>
    <StoreProvider>
      <App />
    </StoreProvider>
  </CookiesProvider>,
  document.getElementById('root'),
);
