// taken from https://www.npmjs.com/package/unistore-hooks/v/0.1.0
import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
} from 'react';
import delve from 'dlv';
import { StoreProps } from '../common/interfaces';
import Actions, { ActionsType } from './Actions';
import Store from './Store';
import { Store as StoreType } from 'unistore';

const StoreContext = createContext(Store);

export const Provider = StoreContext.Provider;

function flatUpdate(state: Partial<StoreProps>, update: Partial<StoreProps>) {
  let changed = false;
  for (const i in update) {
    if (state[i] !== update[i]) {
      if (changed === false) {
        changed = true;
        state = Object.assign({}, state);
      }
      state[i] = update[i];
    }
  }
  return state;
}

function createSelector(sel: string) {
  const newSel = sel
    .split(/\s*,\s*/)
    .reduce((obj, key) => ((obj[key] = key), obj), {});
  return (state: StoreProps) => {
    const selected = {};
    if (state) {
      for (const key in newSel) {
        selected[key] = key in state ? state[key] : delve(state, newSel[key]);
      }
    }
    return selected;
  };
}

export function useStoreState(selector: string): Partial<StoreProps> {
  const store = useContext(StoreContext);
  const filter = useMemo(() => createSelector(selector), []);
  const [state, setState] = useReducer(
    flatUpdate,
    store ? filter(store.getState()) : {}
  );
  useEffect(() => store.subscribe(state => setState(filter(state))), [store]);
  return state;
}

function bindActionsToStore(
  actions: (store: StoreType<StoreProps>) => ActionsType,
  store: StoreType<StoreProps>
) {
  const bindings = new (typeof WeakMap == 'function' ? WeakMap : Map)();
  let bound = bindings.get(actions);
  if (!bound) {
    const newActions = actions(store);
    bindings.set(newActions, (bound = {}));
    for (const i in newActions) bound[i] = store.action(newActions[i]);
  }
  return bound;
}

export function useActions(): ActionsType {
  const store = useContext(StoreContext);
  const boundActions = useMemo(() => bindActionsToStore(Actions, store), [
    Actions,
    store,
  ]);
  return useMemo(() => boundActions, [boundActions]);
}
