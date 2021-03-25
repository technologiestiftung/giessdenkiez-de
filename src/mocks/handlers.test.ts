// handlers.test.ts
import { getProperty } from './handlers';
import cases from 'jest-in-case';
interface CaseOption {
  name: string;
  key: string;
  item: Record<string, unknown> | URLSearchParams | number[];
  result?: string;
}

describe('testing getProperty for body and URLSearchParams', () => {
  test('getProperty', () => {
    expect(getProperty({}, 'queryType')).toBe('');
    expect(getProperty({ queryType: 'foo' }, 'queryType')).toBe('foo');
    expect(getProperty({ queryType: 1 }, 'queryType')).toBe('');
    expect(getProperty({ queryType: { foo: 'bar' } }, 'queryType')).toBe('');
    expect(getProperty({ queryType: [] }, 'queryType')).toBe('');
  });
});

const tester: (opts: CaseOption) => Promise<void> = async ({
  key,
  item,
  result,
}) => {
  expect(getProperty(item, key)).toBe(result);
};
cases('testing getProperty for body and URLSearchParams', tester, [
  { name: 'object', key: 'boom', item: { boom: 'bip' }, result: 'bip' },
  {
    name: 'object but non existing',
    key: 'bah',
    item: { boom: 'bip' },
    result: '',
  },
  {
    name: 'object but not a string',
    key: 'boom',
    item: { boom: 1 },
    result: '',
  },
  {
    name: 'object but not a string',
    key: 'boom',
    item: { boom: { boom: 'bip' } },
    result: '',
  },
  {
    name: 'array is not a string',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    key: 1,
    item: [1, 2, 3],
    result: '',
  },
  {
    name: 'array is not a string',
    key: '1',
    item: [1, 2, 3],
    result: '',
  },
  {
    name: 'urlsearchparams',
    key: 'boom',
    item: new URL('http://localhost:3000?boom=bip').searchParams,
    result: 'bip',
  },
  {
    name: 'urlsearchparams but non existing value',
    key: 'boom',
    item: new URL('http://localhost:3000?bah=bip').searchParams,
    result: '',
  },
]);
