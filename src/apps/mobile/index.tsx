import { ConnectedRouter } from 'connected-react-router';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'src/components';
import { theme } from 'src/theme';
import { ThemeProvider } from 'styled-components';

import { routes } from './routes';
import { store, history } from './state';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              {routes.map(({ ...routeProps }) => (
                <Route key={routeProps.path} {...routeProps} />
              ))}
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
