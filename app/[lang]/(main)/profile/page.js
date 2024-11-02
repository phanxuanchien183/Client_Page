'use client'

import { Orders, ProfileAside } from '@/components'
import { useTitle } from '@/hooks'
import { siteTitle } from '@/utils'
import { useSelector } from 'react-redux'

export default function ProfilePage() {
  useTitle(`${siteTitle} - Trung tâm người dùng`)
  const { user } = useSelector(state => state.user)

  return (
    <>
      <div className="lg:hidden">
        <ProfileAside />
      </div>
      <div className="hidden lg:block">
        <Orders />
      </div>
    </>
  )
}
