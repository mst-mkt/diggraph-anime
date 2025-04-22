'use client'

import { signOutAction } from '@/app/actions/auth/signout'
import { Button } from '@/components/ui/button'
import { LoaderIcon, LogInIcon } from 'lucide-react'
import { useTransition } from 'react'

export const SignOutButton = () => {
  const [pending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(() => signOutAction())
  }

  return (
    <Button onClick={handleClick} className="cursor-pointer" disabled={pending}>
      {pending ? <LoaderIcon className="animate-spin" /> : <LogInIcon />}
      Sign Out
    </Button>
  )
}
