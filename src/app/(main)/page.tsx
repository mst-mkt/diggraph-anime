import { PROJECT_NAME } from '@/constants/project'
import Link from 'next/link'

const Home = () => (
  <div>
    <h1>{PROJECT_NAME}</h1>
    <Link href="/graph" className="text-diggraph-accent hover:underline">
      graph
    </Link>
  </div>
)

export default Home
