'use client'

import { Button } from '@/components/ui/button'
import { signOut } from '@/lib/auth/client'
import { LogOutIcon } from 'lucide-react'

export const SignOutButton = () => (
  <Button onClick={() => signOut()} className="cursor-pointer">
    <LogOutIcon />
    Sign Out
  </Button>
)
