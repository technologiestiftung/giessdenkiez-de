import { withThemesProvider } from 'themeprovider-storybook';
import * as theming from '../src/assets/theme';
// import style from '../src/assets/style.scss';
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
export const decorators = [withThemesProvider([theming.theme])];
