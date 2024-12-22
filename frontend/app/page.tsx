import { Suspense } from 'react'
import Dashboard from '@/components/Dashboard'
import { Skeleton } from "@/components/ui/skeleton"

async function getDashboardData() {
  const res = await fetch(`http://localhost:3000/api/dashboard-data`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch data')
  return res.json()
}

export default async function Home() {
  const dashboardData = await getDashboardData()

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Job Application Dashboard</h1>
      <Suspense fallback={<Skeleton className="w-full h-[600px]" />}>
        <Dashboard initialData={dashboardData} />
      </Suspense>
    </main>
  )
}

