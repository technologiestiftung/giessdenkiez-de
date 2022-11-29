import { requests } from './requestUtil';
describe('utility function requests', () => {
  test('should call fetch using the provided url and json map header', () => {
    jest.spyOn(global, 'fetch');
    requests('blablabla');
    expect(global.fetch).toHaveBeenLastCalledWith('blablabla', {
      headers: { map: { 'content-type': 'application/json' } },
    });
  });
  test('should call fetch using the provided bearer token', () => {
    jest.spyOn(global, 'fetch');
    requests('hello', { token: 'gepetto' });
    expect(global.fetch).toHaveBeenLastCalledWith('hello', {
      headers: {
        map: {
          authorization: 'Bearer gepetto',
          'content-type': 'application/json',
        },
      },
    });
  });
  test('should return the response as json', async () => {
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ that: { is: 'myresponse' } }),
      })
    );
    const res = await requests<{ that: { is: string } }>('blablabla');
    expect(res?.that?.is).toBe('myresponse');
  });
  test('should throw if the response is not ok', async () => {
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: false,
        text: () => Promise.resolve('Pinocchio! Che ho dico! Non e buono!'),
      })
    );
    await expect(requests('blablabla')).rejects.toThrow(
      'Pinocchio! Che ho dico! Non e buono!'
    );
  });
  test('should throw if the parameters are invalid', async () => {
    // @ts-ignore
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() =>
        Promise.reject('Gepetto has no wood left to build pinocchio')
      );
    // @ts-ignore
    await expect(requests()).rejects.toThrow(
      'Gepetto has no wood left to build pinocchio'
    );
  });
});
