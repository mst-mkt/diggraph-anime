import { getSession } from '@/lib/auth/session'
import { redirect } from 'next/navigation'
import { SignOutButton } from '../_components/signout.client'

const SignOutPage = async () => {
  const session = await getSession()

  if (session === null) redirect('/')

  return (
    <div className="flex flex-col gap-y-2">
      <SignOutButton />
    </div>
  )
}

export default SignOutPage
