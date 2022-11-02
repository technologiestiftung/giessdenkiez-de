import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
  DocumentContext,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<
    DocumentInitialProps & {
      styles: JSX.Element;
    }
  > {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render(): JSX.Element {
    return (
      <Html lang='de'>
        <Head>
          <style type='text/css'>
            {`
              @font-face {
                font-family: 'IBM Plex Sans';
                src: url('/fonts/IBMPlexSans-BoldItalic.woff2') format('woff2'),
                url('/fonts/IBMPlexSans-BoldItalic.woff') format('woff');
                font-weight: bold;
                font-style: italic;
            }

            @font-face {
                font-family: 'IBM Plex Sans';
                src: url('/fonts/IBMPlexSans-TextItalic.woff2') format('woff2'),
                url('/fonts/IBMPlexSans-TextItalic.woff') format('woff');
                font-weight: 500;
                font-style: italic;
            }

            @font-face {
                font-family: 'IBM Plex Sans';
                src: url('/fonts/IBMPlexSans-Bold.woff2') format('woff2'),
                url('/fonts/IBMPlexSans-Bold.woff') format('woff');
                font-weight: bold;
                font-style: normal;
            }

            @font-face {
                font-family: 'IBM Plex Sans';
                src: url('/fonts/IBMPlexSans-Text.woff2') format('woff2'),
                url('/fonts/IBMPlexSans-Text.woff') format('woff');
                font-weight: 500;
                font-style: normal;
            }
            `}
          </style>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            // taken from https://www.paulirish.com/2009/fighting-the-font-face-fout/
            (function(){
            // hide content till load (or 3 seconds) to prevent FOUT
                const doc = document;
                const ele = doc.documentElement;
                const style = doc.createElement('style');

                  style.textContent = 'body{visibility:hidden}';
                  const script = doc.getElementsByTagName('script')[0];
                  script.parentNode.insertBefore(style, script);
                  function remove(){
                      if(style.parentNode){
                          doc.body.classList.add("fade")
                          style.parentNode.removeChild(style);
                        }
                    }
                  addEventListener('load',remove,false);
                  setTimeout(remove,1500);

              })();`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
