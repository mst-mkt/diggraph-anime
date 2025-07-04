import { Button } from '@/components/ui/button'
import { LuggageIcon } from 'lucide-react'
import Link from 'next/link'

export const VisitorSignInButton = () => (
  <Button variant="outline" asChild={true} className="w-full cursor-pointer">
    <Link href="/api/auth/visitor">
      <LuggageIcon />
      ゲストとして探索を始める
    </Link>
  </Button>
)
