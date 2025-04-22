import { type Result, err, ok } from '@/lib/result'
import { type BaseIssue, type BaseSchema, type InferOutput, getDotPath, safeParse } from 'valibot'

type ValibotIssue = BaseIssue<unknown>
// biome-ignore lint/suspicious/noExplicitAny: Any is needed to receive any schema
type ValibotSchema = BaseSchema<any, any, ValibotIssue>

export const generateValidateErrorMessage = <Issues extends ValibotIssue[]>(
  issues: Issues,
  dataName?: string,
) => `
Invalid ${dataName ?? 'data'}:

${issues
  .map(
    (issue) => `
  - ${getDotPath(issue)}
    ${issue.message}`,
  )
  .join('\n')}
`

export const validate = <T extends ValibotSchema | undefined>(
  schema: T,
  data: unknown,
  dataName?: string,
): Result<T extends ValibotSchema ? InferOutput<T> : undefined, string> => {
  // biome-ignore lint/suspicious/noExplicitAny: conditionally cast to any
  if (schema === undefined) return ok(undefined as any)

  const result = safeParse(schema, data)

  if (!result.success) {
    return err(generateValidateErrorMessage(result.issues, dataName))
  }

  return ok(result.output)
}

export type ParsePathParam<T extends string> = T extends `${string}{${infer Param}}${infer Rest}`
  ? { [K in Param | keyof ParsePathParam<Rest>]: string | number }
  : Record<never, never>

export const generatePath = <T extends string>(path: T, params: ParsePathParam<T> | undefined) => {
  const paramsMap = Object.entries(params ?? {})

  return paramsMap.reduce((acc: string, [key, value]) => {
    return acc.replace(`{${key}}`, `${value}`)
  }, path)
}

export const generateUrlWithQuery = (
  baseUrl: string,
  params: Record<string, string | number> | undefined,
) => {
  const url = new URL(baseUrl)

  for (const [key, value] of Object.entries(params ?? {})) {
    if (value === undefined) continue
    url.searchParams.set(key, String(value))
  }

  return url
}
