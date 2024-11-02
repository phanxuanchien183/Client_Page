'use client'

import { DashboardAside } from '@/components'
import { useTitle, useTranslate } from '@/hooks'
import { siteTitle } from '@/utils'
import Image from 'next/image'

const AdminPage = () => {
  const trans = useTranslate()
  useTitle(`${siteTitle} - ${trans.common.dashboard}`)
  return (
    <>
      <div className="lg:hidden">
        <DashboardAside />
      </div>
      <section className="hidden py-20 lg:block">
        <Image
          src="/icons/chart.png"
          alt="Biểu đồ"
          width={208}
          height={208}
          className="mx-auto mb-8"
        />

        <p className="text-center">{trans.admin.analysis}</p>
        <span className="block my-3 text-base text-center text-amber-500">({trans.admin.develop})</span>
      </section>
    </>
  )
}

export default AdminPage
