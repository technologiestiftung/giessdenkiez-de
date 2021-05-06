export function createAPIUrl(entrypoint: string): string {
  return `${process.env.API_ENDPOINT}${entrypoint}`;
}
