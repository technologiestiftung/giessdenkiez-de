export function createAPIUrl(entrypoint: string): string {
  return `${process.env.NEXT_PUBLIC_API_ENDPOINT}${entrypoint}`;
}
