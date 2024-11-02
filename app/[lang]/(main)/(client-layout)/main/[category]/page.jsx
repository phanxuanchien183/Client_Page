import { categoryRepo, sliderRepo, bannerRepo } from "@/helpers";

import {
  BannerOne,
  BannerTwo,
  BestSellsSlider,
  Categories,
  DiscountSlider,
  MostFavoriteProducts,
  Slider as MainSlider,
} from "@/components";
import { siteTitle } from "@/utils";
import { useTranslate } from "@/hooks";

// export const revalidate = 20
export const dynamic = "force-dynamic";

const getData = async (category) => {
  const currentCategory = await categoryRepo.getOne({
    slug: category,
  });

  if (!currentCategory) return { notFound: true };

  const sliders = await sliderRepo.getOne({ category_id: currentCategory?.id });

  const bannerOneType = await bannerRepo.getOne({
    category_id: currentCategory?.id,
    type: "one",
  });
  const bannerTwoType = await bannerRepo.getOne({
    category_id: currentCategory?.id,
    type: "two",
  });

  const childCategories = await categoryRepo.getOne({
    parent: currentCategory?.id,
  });

  return {
    currentCategory,
    sliders,
    bannerOneType,
    bannerTwoType,
    childCategories,
  };
};

const MainCategory = async ({ params: { category } }) => {
  const trans = useTranslate()
  const {
    currentCategory,
    sliders,
    bannerOneType,
    bannerTwoType,
    childCategories,
  } = await getData(category);

  //? Render(s)
  return (
    <main className="container min-h-screen space-y-6 xl:mt-28">
      <div className="py-4 mx-auto space-y-12 xl:mt-28">
        <MainSlider data={sliders} />

        <DiscountSlider currentCategory={currentCategory} />

        <Categories
          childCategories={{
            categories: childCategories,
            title: trans.category.all,
          }}
          color={currentCategory.colors?.start}
          name={currentCategory.name}
        />

        <BannerOne data={bannerOneType} />

        <BestSellsSlider categorySlug={currentCategory.slug} />

        <BannerTwo data={bannerTwoType} />

        <MostFavoriteProducts categorySlug={currentCategory.slug} />
      </div>
    </main>
  );
};

export default MainCategory;

export async function generateMetadata({ params: { category } }) {
  const { currentCategory } = await getData(category);

  return {
    title: `${currentCategory.name} | ${siteTitle}`,
  };
}
