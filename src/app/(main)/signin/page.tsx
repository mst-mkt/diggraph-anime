import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { SignInButton } from '../_components/signin.client'

const SignInPage = async () => {
  const session = await auth()

  if (session !== null) redirect('/select')

  return (
    <div className="flex flex-col gap-y-2">
      <p>Annictにログインしてください</p>
      <SignInButton />
    </div>
  )
}

export default SignInPage
