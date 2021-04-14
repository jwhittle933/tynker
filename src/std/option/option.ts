import { cast } from '@/std/generics'

// Module Interface
export interface Options {
    some: <T>(some: T) => Option<T>
    none: () => Option<false>
}

interface OptionBase {
    isSome: () => boolean
    isNone: () => boolean
}

export interface Option<T = false> extends OptionBase {
    Some?: T
    None?: boolean
}

const some = <T>(some: T): Option<T> => {
    return { Some: some, None: false }
}

const none = (): Option => {
    return { None: true }
}

function isSome<T>(this: Option<T>): boolean {
    return !this.None!
}

function isNone<T>(this: Option<T>): boolean {
    return this.None!
}

function contains<T>(this: Option<T>, val: T): boolean {
    return this.isSome() && this.Some! === val
}

export default cast<Options>({ some, none })
