import { requests } from './requestUtil';
describe('utility function requests', () => {
  test('should call fetch using the provided url and json map header', () => {
    vi.spyOn(global, 'fetch');
    requests('http://some-url.com/');
    expect(global.fetch).toHaveBeenLastCalledWith('http://some-url.com/', {
      headers: new Headers({
        'content-type': 'application/json',
      }),
    });
  });

  test('should call fetch using the provided bearer token', () => {
    vi.spyOn(global, 'fetch');
    requests('http://some-url.com/', { token: 'gepetto' });

    expect(global.fetch).toHaveBeenLastCalledWith('http://some-url.com/', {
      headers: new Headers({
        'content-type': 'application/json',
        authorization: 'Bearer gepetto',
      }),
    });
  });
  test('should return the response as json', async () => {
    // @ts-ignore
    vi.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ that: { is: 'myresponse' } }),
      })
    );
    const res = await requests<{ that: { is: string } }>(
      'http://some-url.com/'
    );
    expect(res?.that?.is).toBe('myresponse');
  });
  test('should throw if the response is not ok', async () => {
    // @ts-ignore
    vi.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: false,
        text: () => Promise.resolve('Pinocchio! Che ho dico! Non e buono!'),
      })
    );
    await expect(requests('http://some-url.com/')).rejects.toThrow(
      'Pinocchio! Che ho dico! Non e buono!'
    );
  });
  test('should throw if the parameters are invalid', async () => {
    // @ts-ignore
    vi.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.reject('Gepetto has no wood left to build pinocchio')
    );
    // @ts-ignore
    await expect(requests()).rejects.toThrow(
      'Gepetto has no wood left to build pinocchio'
    );
  });
});
