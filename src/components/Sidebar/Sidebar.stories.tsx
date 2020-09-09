import React from 'react';
import Sidebar from './index';
import { Story } from '@storybook/react/types-6-0';
import { Router } from 'react-router-dom';
import history from '../../history';
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
      <Router history={history}>
        <Sidebar {...args} />
      </Router>
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
export const Adopted = Template.bind({});
Adopted.args = {
  match: 'adopted',
};
