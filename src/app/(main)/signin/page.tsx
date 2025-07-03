import { getSession } from '@/lib/auth/session'
import { redirect } from 'next/navigation'
import { SignInButton } from '../_components/signin.client'
import { VisitorSignInButton } from '../_components/visitor'

const SignInPage = async () => {
  const session = await getSession()

  if (session !== null) redirect('/select')

  return (
    <div className="flex flex-col gap-y-2">
      <p>Annictにログインしてください</p>
      <SignInButton />
      <p>Visitorとしてログイン</p>
      <VisitorSignInButton />
    </div>
  )
}

export default SignInPage
