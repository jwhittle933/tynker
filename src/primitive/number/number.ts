import Modules from '@/core/module'

export interface Numbers {
  rand: (n: number) => number
}

export const rand = (n: number): number => Math.floor(Math.random() * n)

export default Modules.module<Numbers>({ rand })
