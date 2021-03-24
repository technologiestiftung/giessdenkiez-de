export const areCookiesAccepted = (a: string | number): boolean => {
  const b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
  return b ? b.pop() === 'true' : false;
};
