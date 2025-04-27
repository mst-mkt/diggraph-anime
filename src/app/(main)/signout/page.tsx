import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { SignOutButton } from '../_components/signout.client'

const SignOutPage = async () => {
  const session = await auth()

  if (session === null) redirect('/')

  return (
    <div className="flex flex-col gap-y-2">
      <SignOutButton />
    </div>
  )
}

export default SignOutPage
