import { Button } from '@/components/ui/button'
import { LogInIcon } from 'lucide-react'
import Link from 'next/link'

export const VisitorSignInButton = () => (
  <Button asChild={true} className="cursor-pointer">
    <Link href="/api/auth/visitor">
      <LogInIcon />
      Sign In
    </Link>
  </Button>
)
