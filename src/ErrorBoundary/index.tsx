import React from 'react';
/**
 * For more info on the error boundary see
 * https://reactjs.org/docs/error-boundaries.html
 *
 */
export default class ErrorBoundary extends React.Component<
  {},
  { hasError: boolean; error: Error | null; errorInfo: any }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(_): { hasError: boolean } {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  componentDidMount(): void {
    // eslint-disable-next-line no-console
  }

  componentDidCatch(error, errorInfo): void {
    // You can also log the error to an error reporting service

    this.setState({ hasError: this.state.hasError, error, errorInfo });
    console.error(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <div
            style={{
              fontFamily: 'IBM Plex Sans',
              position: 'absolute',
              width: '100%',
              height: '100%',
              zIndex: 2000,
              justifyContent: 'center',
              // background: "white",
              top: 0,
              left: 0,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '25vh',
                width: '50vw',
              }}
            >
              <h1>Irgendwas ist schief gelaufen.</h1>
              <p>
                Bitte wende dich an das{' '}
                <a href='https://www.citylab-berlin.org/'>CityLAB</a> oder
                schreib uns einen Issue auf{' '}
                <a href='https://github.com/technologiestiftung/giessdenkiez-de/issues/new'>
                  GitHub
                </a>
                . Vielleicht hilft es auch die Seite neu zu laden?
              </p>
            </div>
          </div>
        </>
      );
    }
    return this.props.children;
  }
}
