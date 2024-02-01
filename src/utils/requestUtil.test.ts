import { requests } from './requestUtil';
import { MockInstance } from 'vitest';

describe('utility function requests', () => {
  let fetchSpy: MockInstance<
    [input: string | URL | Request, init?: RequestInit | undefined],
    Promise<Response>
  >;

  beforeEach(() => {
    fetchSpy = vi.spyOn(global, 'fetch');
  });

  test('should call fetch using the provided url and json map header', () => {
    fetchSpy.mockImplementationOnce(
      () =>
        (({
          ok: true,
          json: () => {},
        } as unknown) as Promise<Response>)
    );

    requests('/some-path');

    expect(global.fetch).toHaveBeenLastCalledWith('/some-path', {
      headers: new Headers({
        'content-type': 'application/json',
      }),
    });
  });

  test('should call fetch using the provided bearer token', () => {
    fetchSpy.mockImplementationOnce(
      () =>
        (({
          ok: true,
          json: () => {},
        } as unknown) as Promise<Response>)
    );

    requests('/some-path', { token: 'gepetto' });

    expect(global.fetch).toHaveBeenLastCalledWith('/some-path', {
      headers: new Headers({
        'content-type': 'application/json',
        authorization: 'Bearer gepetto',
      }),
    });
  });

  test('should return the response as json', async () => {
    fetchSpy.mockImplementationOnce(
      () =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ that: { is: 'myresponse' } }),
        }) as Promise<Response>
    );

    const res = await requests<{ that: { is: string } }>('/some-path');

    expect(res?.that?.is).toBe('myresponse');
  });

  test('should throw if the response is not ok', async () => {
    fetchSpy.mockImplementationOnce(
      () =>
        Promise.resolve({
          ok: false,
          text: () => Promise.resolve('some error'),
        }) as Promise<Response>
    );

    await expect(requests('/some-path')).rejects.toThrow('some error');
  });

  test('should throw if the parameters are invalid', async () => {
    fetchSpy.mockImplementationOnce(() => Promise.reject('missing params'));
    // @ts-ignore
    await expect(requests()).rejects.toThrow('missing params');
  });
});
