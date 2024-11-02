'use client' // Error components must be Client Components
import { ArrowLink, ResponsiveImage, DashboardLayout } from '@/components'
import { useTranslate } from '@/hooks'

export default function NotFound() {
  const trans = useTranslate()
  //? Render(s)
  return (
    <DashboardLayout>
      <main className="flex flex-col items-center justify-center py-8 gap-y-6 xl:mt-28">
        <p className="text-base font-semibold text-black">404 {trans.common.not_found}!</p>
        <ArrowLink path="/admin">{trans.common.go_to_dashboard}</ArrowLink>
        <ResponsiveImage
          dimensions="w-full max-w-lg h-72"
          src="/icons/page-not-found.png"
          layout="fill"
          alt="404"
        />
      </main>
    </DashboardLayout>
  )
}
