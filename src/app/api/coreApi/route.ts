import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_COINGECKO}`, { cache: "no-cache" });
  console.log('api')
  if (!res.ok) throw new Error('API is not responding')

  const data = await res.json()

  return NextResponse.json({ data }, {
    status: 200, headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  })
} 