export type Ok<T = unknown> = {
  isOk: true
  value: T
}

export type Err<T = unknown> = {
  isOk: false
  error: T
}

export type Result<T, E> = Ok<T> | Err<E>

export const ok = <T>(value: T): Result<T, never> => ({
  isOk: true,
  value,
})

export const err = <E>(error: E): Result<never, E> => ({
  isOk: false,
  error,
})

export const isOk = <T, E>(result: Result<T, E>): result is Ok<T> => result.isOk
export const isErr = <T, E>(result: Result<T, E>): result is Err<E> => !result.isOk
