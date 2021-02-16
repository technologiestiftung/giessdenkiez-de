// taken from https://www.npmjs.com/package/unistore-hooks/v/0.1.0
import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useReducer,
  useEffect,
} from 'react';
import Store from './Store';
// npm.im/dlv
function dlv(t, e, l?, n?, r?) {
  for (e = e.split ? e.split('.') : e, n = 0; n < e.length; n++)
    t = t ? t[e[n]] : r;
  return t === r ? l : t;
}

const StoreContext = createContext(Store);

export const Provider = StoreContext.Provider;

function flatUpdate(state, update) {
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

function createSelector(sel) {
  const type = typeof sel;
  if (type == 'function') return sel;
  if (type == 'string') sel = sel.split(/\s*,\s*/);
  if (Array.isArray(sel))
    sel = sel.reduce((obj, key) => ((obj[key] = key), obj), {});
  return state => {
    const selected = {};
    if (state) {
      for (const key in sel) {
        selected[key] = key in state ? state[key] : dlv(state, sel[key]);
      }
    }
    return selected;
  };
}

export function useStore() {
  return useContext(StoreContext);
}

export function useStoreState(selector: string) {
  const store = useContext(StoreContext);
  const filter = useMemo(() => createSelector(selector), []);
  const [state, setState] = useReducer(
    flatUpdate,
    store ? filter(store.getState()) : {}
  );
  useEffect(() => store.subscribe(state => setState(filter(state))), [store]);
  return state;
}

function bindActionsToStore(actions, store) {
  const bindings =
    store.bindings ||
    (store.bindings = new (typeof WeakMap == 'function' ? WeakMap : Map)());
  let bound = bindings.get(actions);
  if (!bound) {
    bindings.set(actions, (bound = {}));
    if (typeof actions === 'function') actions = actions(store);
    for (const i in actions) bound[i] = store.action(actions[i]);
  }
  return bound;
}

export function useActions(actions, mapping?, deps?) {
  if (typeof deps == 'function') [deps, mapping] = [mapping, deps];
  const store = useContext(StoreContext);
  const boundActions = useMemo(() => bindActionsToStore(actions, store), [
    actions,
    store,
  ]);
  mapping = useCallback(mapping, deps || []);
  const boundMapping = useMemo(() => {
    let a = mapping;
    const map = {};
    if (!a) return boundActions;
    if (typeof a === 'function') a = a(boundActions);
    for (const i in a) {
      let v = a[i];
      if (Array.isArray(v)) {
        v = v[0].bind(...v);
        // const f = v[0];
        // const a = v;
        // v = s => f.apply(this, (a[0]=s, a));
      }
      // map[i] = store.action(v);
      map[i] = v;
    }
    return map;
  }, [boundActions, mapping]);
  return boundMapping;
}
