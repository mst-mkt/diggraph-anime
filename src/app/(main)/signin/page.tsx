import { getSession } from '@/lib/auth/session'
import { HeartPlusIcon, NotebookIcon, SaveIcon, SearchIcon, SparklesIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import { SignInButton } from '../_components/signin.client'
import { VisitorSignInButton } from '../_components/visitor'

const SignInPage = async () => {
  const session = await getSession()

  if (session !== null) redirect('/select')

  return (
    <div className="flex flex-col gap-y-10">
      <h1 className="flex items-center gap-x-2 font-bold text-lg">
        <SparklesIcon className="text-diggraph-accent" size={24} />
        <span>ログイン</span>
      </h1>
      <div className="flex flex-col gap-y-4">
        <p>
          <span className="font-bold">Diggraph Anime</span>は
          <a href="https://annict.com" className="text-diggraph-accent">
            Annict
          </a>
          のAPIを利用しています。そのため、最大限の機能を使用するためにはログインが必要です。
        </p>
        <p>ログインすることで以下の機能が使用できます。</p>
        <ul className="flex flex-col gap-y-4 rounded-lg border-2 border-border border-dotted p-4 text-sm">
          <li className="flex items-center gap-x-2">
            <SearchIcon size={20} className="text-diggraph-accent" />
            <span>作品の検索や絞りこみ</span>
          </li>
          <li className="flex items-center gap-x-2">
            <NotebookIcon size={20} className="text-diggraph-accent" />
            <span>作品の詳細な情報やレビューの閲覧</span>
          </li>
          <li className="flex items-center gap-x-2">
            <HeartPlusIcon size={20} className="text-diggraph-accent" />
            <span>気になった作品をコレクションに追加</span>
          </li>
          <li className="flex items-center gap-x-2">
            <SaveIcon size={20} className="text-diggraph-accent" />
            <span>作成したグラフの保存と共有</span>
          </li>
        </ul>

        <SignInButton />
      </div>
      <div className="flex flex-col gap-y-4 rounded-lg bg-muted p-4 pt-6">
        <div className="flex flex-col items-center gap-y-2">
          <p className="text-muted-foreground text-xs tracking-wider">
            Annictのアカウントをお持ちでない方がない方のための
          </p>
          <h2 className="font-bold text-diggraph-accent-600 text-xl">ゲストモード</h2>
        </div>
        <p>
          ゲストモードでは一部の機能が制限されます。アニメの探索を最大限楽しむためには、アカウントを作成することをお勧めします。
        </p>
        <VisitorSignInButton />
      </div>
    </div>
  )
}

export default SignInPage
