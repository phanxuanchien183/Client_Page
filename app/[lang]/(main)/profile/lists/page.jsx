'use client'

import { FavoritesListEmpty, PageContainer, ProfileLayout } from 'components'
import { useTitle } from '@/hooks'

const Lists = () => {
  useTitle('Danh sách yêu thích của tôi')
  //? Render(s)
  return (
    <main>
      <PageContainer title="Danh sách yêu thích của tôi">
        <section className="py-20">
          <FavoritesListEmpty className="mx-auto h-52 w-52" />
          <p className="text-center">Danh sách yêu thích của bạn trống</p>
          <span className="block my-3 text-base text-center text-amber-500">
            （Sẽ sớm xuất hiện）
          </span>
        </section>
      </PageContainer>
    </main>
  )
}

export default Lists
