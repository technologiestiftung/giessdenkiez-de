import * as NextImage from 'next/image';
// import { RouterContext } from 'next/dist/shared/lib/router-context';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: props => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  nextjs: {
    appDirectory: false,
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
