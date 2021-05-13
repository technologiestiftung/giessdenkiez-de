export function createAPIUrl(entrypoint: string): string {
  const endpoint = (process.env.NODE_ENV === 'development') 
    ? (process.env.API_ENDPOINT_DEV ? process.env.API_ENDPOINT_DEV : '')
    : (process.env.NODE_ENV === 'production') 
      ? ( process.env.API_ENDPOINT_PROD ? process.env.API_ENDPOINT_PROD 
          : ( process.env.API_ENDPOINT ? process.env.API_ENDPOINT : ''))
      : ( process.env.API_ENDPOINT ? process.env.API_ENDPOINT : '')
  return `${endpoint}${entrypoint}`;
}
