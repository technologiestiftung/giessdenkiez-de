import React from 'react';
import { NextPage } from 'next';
import postgrestRestProvider, {
  IDataProviderConfig,
  defaultPrimaryKeys,
  defaultSchema,
} from '@raphiniert/ra-data-postgrest';
import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  fetchUtils,
} from 'react-admin';

import dynamic from 'next/dynamic';
const AdminPanel = dynamic(() => import('../../src/components/admin'), {
  ssr: false,
});

const Home: NextPage = () => <AdminPanel />;

export default Home;
