import 'server-only'
import { url, minLength, object, pipe, safeParse, string } from 'valibot'

const envVariablesSchema = object({
  // App
  BASE_URL: pipe(string(), url()),

  // Auth
  AUTH_SECRET: pipe(string(), minLength(1)),
  ANNICT_CLIENT_ID: pipe(string(), minLength(1)),
  ANNICT_CLIENT_SECRET: pipe(string(), minLength(1)),
})

const envVariablesResult = safeParse(envVariablesSchema, process.env)

if (!envVariablesResult.success) {
  console.error('[ERROR] Environment variables are not valid.')
  for (const issue of envVariablesResult.issues) {
    console.error(`- ${issue.message}`)
  }
  process.exit(1)
}

export const { BASE_URL, AUTH_SECRET, ANNICT_CLIENT_ID, ANNICT_CLIENT_SECRET } =
  envVariablesResult.output
