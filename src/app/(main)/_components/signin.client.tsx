'use client'

import { Button } from '@/components/ui/button'
import { signIn } from '@/lib/auth/client'
import { PickaxeIcon } from 'lucide-react'

export const SignInButton = () => {
  const handleSignIn = () => {
    signIn.social({ provider: 'annict', callbackURL: '/select' })
  }

  return (
    <Button onClick={handleSignIn} className="cursor-pointer">
      <PickaxeIcon />
      ログインして探索を始める
    </Button>
  )
}
