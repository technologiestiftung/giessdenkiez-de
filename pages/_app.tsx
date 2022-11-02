import type { AppProps } from 'next/app';
import { Providers } from '../src/Providers';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}
