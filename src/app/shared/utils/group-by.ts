export function groupBy<T, K>(array: T[], chave: (item: T) => K): Map<K, T[]> {

    const resultado = new Map<K, T[]>();

    for (const item of array) {
        const key = chave(item);

        if (!resultado.has(key)) {
            resultado.set(key, []);
        }

        resultado.get(key)!.push(item);
    }

    return resultado;
}

type Grouped<T> = Map<any, T[] | Grouped<T>>;

export function groupByMulti<T>(
  array: T[],
  ...keys: ((item: T) => any)[]
): Grouped<T> {

  if (keys.length === 0) {
    throw new Error('groupBy precisa de pelo menos uma chave');
  }

  const resultado = new Map<any, T[] | Grouped<T>>();

  for (const item of array) {
    let grupo = resultado;

    keys.forEach((getKey, index) => {

      const key = getKey(item);
      const ultimaChave = index === keys.length - 1;

      if (ultimaChave) {

        if (!grupo.has(key)) {
          grupo.set(key, []);
        }

        (grupo.get(key) as T[]).push(item);

      } else {

        if (!grupo.has(key)) {
          grupo.set(key, new Map());
        }

        grupo = grupo.get(key) as Grouped<T>;
      }
    });
  }

  return resultado;
}