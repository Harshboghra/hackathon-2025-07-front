import 'symbol-observable';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import { BrowserRouter } from 'react-router-dom';
import { client } from './service/graphql/graphql';
import { ApolloProvider } from '@apollo/client';
import MessageProvider from './contexts/message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import store from './state/store';
import { AbilityContext } from './library/ability/Can';
import './i18n';
import { ability } from './library/ability/ability';

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <AbilityContext.Provider value={ability}>
          <PrimeReactProvider>
            <ApolloProvider client={client}>
              <MessageProvider>
                <App />
              </MessageProvider>
            </ApolloProvider>
          </PrimeReactProvider>
        </AbilityContext.Provider>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);
