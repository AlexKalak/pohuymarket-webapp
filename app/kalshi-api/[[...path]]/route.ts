import { NextRequest, NextResponse } from 'next/server'

const KALSHI_BASE_URL = 'https://api.elections.kalshi.com'

async function proxyPath(req: NextRequest, path: string[]) {
  const search = req.nextUrl.search
  const url = `${KALSHI_BASE_URL}/${path.join('/')}${search}`

  const headers = new Headers()
  headers.set('Authorization', req.headers.get('authorization') ?? '')
  headers.set('Content-Type', 'application/json')
  headers.set('User-Agent', 'kalshi-server-proxy')

  const res = await fetch(url, {
    method: req.method,
    headers,
    body:
      req.method === 'GET' || req.method === 'HEAD'
        ? undefined
        : await req.text(),
    cache: 'no-store', // IMPORTANT for finance APIs
  })

  const body = await res.text()

  return new NextResponse(body, {
    status: res.status,
    headers: {
      'Content-Type': res.headers.get('content-type') ?? 'application/json',
    },
  })
}

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  console.log(req)
  const p = await params
  return proxyPath(req, p.path)
}

export async function POST(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const p = await params
  return proxyPath(req, p.path)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const p = await params
  return proxyPath(req, p.path)
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const p = await params
  return proxyPath(req, p.path)
}
