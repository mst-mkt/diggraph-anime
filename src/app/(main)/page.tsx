import { PROJECT_NAME } from '@/constants/project'
import { annictApiClient } from '@/lib/api/annict-rest'
import { auth } from '@/lib/auth'
import Link from 'next/link'
import { SignInButton } from './_components/signin.client'
import { SignOutButton } from './_components/signout.client'

const Home = async () => {
  const session = await auth()
  const animes = await annictApiClient.getWorks({
    query: { sort_watchers_count: 'desc' },
  })

  return (
    <div className="flex flex-col items-start gap-y-2">
      <h1>{PROJECT_NAME}</h1>
      <Link href="/graph" className="text-diggraph-accent hover:underline">
        graph
      </Link>
      {session === null ? <SignInButton /> : <SignOutButton />}
      {session !== null && (
        <pre className="whitespace-pre-wrap rounded-md border-2 bg-muted p-4">
          <code>{JSON.stringify(session, null, 2)}</code>
        </pre>
      )}
      {animes.isOk ? (
        animes.value.works.map(({ title, id, season_name_text }) => (
          <div key={id}>
            {season_name_text} - {title}
          </div>
        ))
      ) : (
        <div>No works available</div>
      )}
    </div>
  )
}
export default Home
