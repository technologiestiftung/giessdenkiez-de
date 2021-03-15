import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

const ReduxProvider: FC = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export default ReduxProvider;
