import React from 'react';
import Sidebar from './index';
import { Story } from '@storybook/react/types-6-0';
import history from '../../history';
import { Providers } from '../../Providers';
export default {
  title: 'Sidebar',
  component: Sidebar,
};
// profile
// adopted
// search
// about
const Template: Story<{ location: string; match: string }> = args => {
  history.push(args.match);
  return (
    <>
      <Providers>
        <Sidebar />
      </Providers>
    </>
  );
};

export const About = Template.bind({});
About.args = {
  match: 'about',
};

export const Search = Template.bind({});
Search.args = {
  match: 'search',
};
export const SearchLocation = Template.bind({});
SearchLocation.args = {
  match: 'search?location=_ri61gkdkf',
};

export const ProfileLoggedOut = Template.bind({});
ProfileLoggedOut.args = {
  match: 'profile',
};
export const ProfileLoggedIn = Template.bind({});
ProfileLoggedIn.args = {
  match: 'profile',
};
