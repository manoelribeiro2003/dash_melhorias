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