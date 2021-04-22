export interface Modules {
  module: <T>(data: T) => T
}

export const module = <T>(data: T): T => data

export default module<Modules>({ module })
