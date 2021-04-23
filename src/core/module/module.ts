export interface Modules {
  module: <T>(data: T) => T
}

export const _module = <T>(data: T): T => data

export default _module<Modules>({ module: _module })
