export interface Keyword {
  add: <K, V>(kwl: KeywordList<K, V>, key: K, value: V) => KeywordList<K, V>
}

export interface KeywordList<K, V> extends Array<[K, V]> {}

const toObj = () => {
  //
}

const add = <K, V>(kw: KeywordList<K, V>, key: K, value: V): KeywordList<K, V> => {
  return [...kw, [key, value]]
}

export default <Keyword>{}
