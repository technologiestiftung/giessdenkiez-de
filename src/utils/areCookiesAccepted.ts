export const areCookiesAccepted = (a: string | number): boolean => {
  // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
  const b = document.cookie.match(`(^|;)\\s*${a}\\s*=\\s*([^;]+)`);
  return b ? b.pop() === 'true' : false;
};
