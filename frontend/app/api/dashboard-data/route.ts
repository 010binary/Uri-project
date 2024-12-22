import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const [applicationsRes, statsRes] = await Promise.all([
      fetch('https://uri-project-d5vg.onrender.com/applications', { cache: 'no-store' }),
      fetch('https://uri-project-d5vg.onrender.com/applications/stats', { cache: 'no-store' })
    ])

    if (!applicationsRes.ok || !statsRes.ok) {
      throw new Error('Failed to fetch data')
    }

    const applications = await applicationsRes.json()
    const stats = await statsRes.json()

    return NextResponse.json({ applications, stats })
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

