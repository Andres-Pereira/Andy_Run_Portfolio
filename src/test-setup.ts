// Setup global de Vitest: APIs del navegador que jsdom / Node no traen listas.

// jsdom no implementa matchMedia. Default: sin reduced-motion (los specs lo sobrescriben con vi.stubGlobal).
if (typeof globalThis.matchMedia !== 'function') {
  globalThis.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as typeof globalThis.matchMedia;
}

// Node ≥ 25 expone un localStorage global indefinido sin --localstorage-file que oculta el de jsdom.
if (typeof globalThis.localStorage?.getItem !== 'function') {
  const store = new Map<string, string>();
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      get length() {
        return store.size;
      },
      key: (i: number) => [...store.keys()][i] ?? null,
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => void store.set(k, String(v)),
      removeItem: (k: string) => void store.delete(k),
      clear: () => store.clear(),
    } satisfies Storage,
  });
}

// jsdom no implementa el scroll programático en elementos.
for (const method of ['scrollTo', 'scrollBy'] as const) {
  if (typeof Element.prototype[method] !== 'function') {
    Element.prototype[method] = function () {} as Element[typeof method];
  }
}
