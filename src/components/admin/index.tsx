import React from 'react';
import {
  Admin,
  Resource,
  Create,
  ListGuesser,
  DeleteButton,
  EditGuesser,
  fetchUtils,
  Datagrid,
  List,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
} from 'react-admin';
import postgrestRestProvider, {
  IDataProviderConfig,
  defaultPrimaryKeys,
  defaultSchema,
} from '@raphiniert/ra-data-postgrest';
import { useSessionContext } from '@supabase/auth-helpers-react';

const config: IDataProviderConfig = {
  apiUrl: '/api/admin',
  httpClient: fetchUtils.fetchJson,
  defaultListOp: 'eq',
  primaryKeys: defaultPrimaryKeys,
  schema: defaultSchema,
};

const FaqCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source='question' />
      <TextInput source='answer' />
    </SimpleForm>
  </Create>
);

const FaqList = () => (
  <List>
    <Datagrid rowClick='edit'>
      <TextField source='id' />
      <TextField source='question' />
      <TextField source='answer' />
      <DeleteButton mutationMode='pessimistic' />
    </Datagrid>
  </List>
);

export const FaqEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source='id' disabled />
      <TextInput source='question' />
      <TextInput source='answer' />
    </SimpleForm>
  </Edit>
);

const dataProvider = postgrestRestProvider(config);
// import jsonServerProvider from 'ra-data-json-server';

// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const AdminPanel = () => {
  const { isLoading: isLoadingSupase, session } = useSessionContext();

  if (isLoadingSupase) {
    return <div>Loading...</div>;
  }

  return session === null ? (
    <div> not allowed </div>
  ) : (
    <Admin dataProvider={dataProvider}>
      <Resource name='faqs' list={FaqList} edit={FaqEdit} create={FaqCreate} />
      {/* <Resource
      name='posts'
      list={ListGuesser}
      edit={EditGuesser}
      recordRepresentation='title'
    /> */}
      {/* <Resource name='comments' list={ListGuesser} edit={EditGuesser} /> */}
    </Admin>
  );
};

export default AdminPanel;
