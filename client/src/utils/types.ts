export type Params = any[]
export type Fn<P extends Params, T> = (...args: P) => T
