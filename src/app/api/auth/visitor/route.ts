import { BASE_URL } from '@/lib/env-variables'
import { NextResponse } from 'next/server'

export const GET = () => {
  return NextResponse.redirect(`${BASE_URL}/select?visitor=true`)
}
