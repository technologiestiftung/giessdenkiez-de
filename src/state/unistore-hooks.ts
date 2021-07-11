// taken from https://www.npmjs.com/package/unistore-hooks/v/0.1.0
import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { StoreProps } from '../common/interfaces';
import Actions, { ActionsType } from './Actions';
import Store from './Store';

const StoreContext = createContext(Store);

export const Provider = StoreContext.Provider;

export function useStoreState<Key extends keyof StoreProps>(
  selector: Key
): StoreProps[Key] {
  const store = useContext(StoreContext);
  const [stateItem, setState] = useState<StoreProps[Key]>(
    store.getState()[selector]
  );
  useEffect(() => store.subscribe(state => setState(state[selector])), [store]);
  return stateItem;
}

export function useActions(): ActionsType {
  const store = useContext(StoreContext);
  const boundActions = useMemo<ActionsType>(
    () =>
      Object.keys(Actions).reduce((acc, key) => {
        const action = Actions[key];
        return {
          ...acc,
          [key]: (...args: Parameters<typeof action>) => {
            const state = store.getState();
            const newState = action(...args, state);
            store.setState(newState);
            return { ...state, ...newState };
          },
        };
      }, Actions),
    [Actions, store]
  );
  return useMemo(() => boundActions, [boundActions]);
}
