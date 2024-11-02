// import { Metadata } from 'next'
import { bannerRepo, categoryRepo, sliderRepo } from '@/helpers'
import {
  BannerOne,
  BannerTwo,
  BestSellsSlider,
  Categories,
  DiscountSlider,
  Slider as MainSlider,
  MostFavoriteProducts,
} from '@/components'
import { enSiteTitle, siteTitle, siteDescription, enSiteDescription, getDictionary } from '@/utils'

export async function generateMetadata({
  params: { lang }
}) {
  return {
    title: lang === 'en' ? enSiteTitle : siteTitle,
    description: lang === 'en' ? enSiteDescription : siteDescription,
  };
}


// export const revalidate = 20
export const dynamic = 'force-dynamic'

export default async function Home({params: { lang }}) {
  const trans = getDictionary(lang);

  const currentCategory = await categoryRepo.getOne({
    parent: undefined,
  })
  const childCategories = await categoryRepo.getAll(
    {},
    {
      parent: undefined,
    }
  )

  const sliders = await sliderRepo.getAll({ category_id: currentCategory?.id })

  // const bannerOneType = await bannerRepo.getAll(
  //   {},
  //   {
  //     category_id: currentCategory?.id,
  //     type: 'one',
  //   }
  // )
  // const bannerTwoType = await bannerRepo.getAll(
  //   {},
  //   {
  //     category_id: currentCategory?.id,
  //     type: 'two',
  //   }
  // )

  return (
    <main className="min-h-screen xl:mt-28 container space-y-24">
      <div className="py-4 mx-auto space-y-24 xl:mt-28">
        <MainSlider data={sliders} />
        {/* <DiscountSlider currentCategory={currentCategory} /> */}
        <Categories
          childCategories={{ categories: childCategories, title: trans.category.all }}
          homePage
        />
        {/* <BannerOne data={bannerOneType} /> */}
        <BestSellsSlider categorySlug={currentCategory?.slug} lang />
        {/* <BannerTwo data={bannerTwoType} /> */}
        <MostFavoriteProducts categorySlug={currentCategory?.slug} lang />
      </div>
    </main>
  )
}
