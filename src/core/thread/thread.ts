export interface Threading {
  first: null
  last: null
}

export interface Threader {
  (t: any, args: any[]): any
}

export type FnConfig = [fn: Function, ...args: any[]]
export type DynFnConfig = [threader: Threader, fn: Function, ...args: any[]]

const threadFirst = (threaded: any, list: FnConfig[]) => list.reduce(first, threaded)

const threadLast = (threaded: any, list: FnConfig[]) => list.reduce(last, threaded)

const threadDyn = (threaded: any, list: DynFnConfig[]) => list.reduce(dyn, threaded)

const dyn = (t: any, [threader, fn, ...args]: DynFnConfig) => threader(t, [fn, ...args])

const first = (t: any, [fn, ...args]: FnConfig) => fn(...[t, ...args])

const last = (t: any, [fn, ...args]: FnConfig) => fn(...[...args, t])

export default {
  first: threadFirst,
  last: threadLast,
  dynamic: threadDyn,
  threaders: {
    first,
    last,
  },
}
