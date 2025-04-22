'use client'

import { signInAction } from '@/app/actions/auth/signin'
import { Button } from '@/components/ui/button'
import { LoaderIcon, LogInIcon } from 'lucide-react'
import { useTransition } from 'react'

export const SignInButton = () => {
  const [pending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(() => signInAction('annict'))
  }

  return (
    <Button onClick={handleClick} className="cursor-pointer" disabled={pending}>
      {pending ? <LoaderIcon className="animate-spin" /> : <LogInIcon />}
      Sign In
    </Button>
  )
}
