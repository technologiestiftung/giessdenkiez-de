export function createAPIUrl(entrypoint: string): string {
  return process.env.NODE_ENV === 'production'
    ? `${process.env.API_ENDPOINT_PROD}${entrypoint}`
    : `${process.env.API_ENDPOINT_DEV}${entrypoint}`;
}
