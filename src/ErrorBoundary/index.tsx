import React, { Component, ErrorInfo, ReactNode } from 'react';
import Link from 'next/link';

/**
 * For more info on the error boundary see
 * https://reactjs.org/docs/error-boundaries.html
 *
 */
export default class ErrorBoundary extends Component<
  Record<string, unknown>,
  { hasError: boolean; error: Error | null }
> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can also log the error to an error reporting service

    this.setState({ hasError: this.state.hasError, error });
    console.error(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <div
            style={{
              fontFamily: 'IBM Plex Sans, sans-serif',
              position: 'absolute',
              width: '100%',
              height: '100%',
              zIndex: 2000,
              justifyContent: 'center',
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
                justifyContent: 'space-between',
                maxWidth: '605px',
                borderRadius: '15px',
                padding: '28px 41px 28px 35px',
                background: '#F7F7F7',
                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.15)',
                marginRight: '33px',
                marginLeft: '33px',
              }}
            >
              <svg
                width='40'
                height='32'
                viewBox='0 0 40 32'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                style={{ alignSelf: 'center' }}
              >
                <path
                  d='M1 3.98771L1 30.6533C1.00001 32.6983 5.32293 25.0294 8.20493 25.0294H35.9585C37.6153 25.0294 38.9459 23.6862 38.9459 22.0294V4C38.9459 2.34315 37.6028 1 35.9459 1H4C2.34315 1 1 2.33086 1 3.98771Z'
                  fill='#FFD3DD'
                  stroke='#FD4465'
                  strokeWidth='2'
                />
                <path
                  d='M13.3068 6.6897L25.6136 19.1035M13.3068 19.1035L25.6136 6.6897'
                  stroke='#FD4465'
                  strokeWidth='2'
                />
              </svg>

              <h1
                style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  lineHeight: '130%',
                  marginTop: '11px',
                  marginBottom: '0',
                }}
              >
                {title}
              </h1>
              <p
                style={{
                  marginTop: '11px',
                  marginBottom: '0',
                  lineHeight: '145%',
                }}
              >
                {contact}{' '}
                <a
                  href='mailto:giessdenkiez@citylab-berlin.de'
                  className='error-page-link'
                >
                  CityLAB
                </a>{' '}
                {issue}{' '}
                <a
                  href='https://github.com/technologiestiftung/giessdenkiez-de/issues/new'
                  className='error-page-link'
                >
                  GitHub
                </a>
                . <br />
                {reload}
              </p>
              <Link href='/' className='error-page-button'>
                {backToHome}
              </Link>
            </div>
          </div>
        </>
      );
    }

    return this.props.children as ReactNode;
  }
}
