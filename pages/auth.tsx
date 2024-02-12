import React from 'react';
import { MapLayout } from '../src/components/MapLayout';
import { Page } from '../src/nextPage';

import AuthForm from '../src/components/Forms/AuthForm';

const AuthPage: Page = () => {
  return <AuthForm />;
};
AuthPage.layout = MapLayout;

export default AuthPage;
