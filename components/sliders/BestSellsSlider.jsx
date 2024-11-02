import Link from "next/link";

import { Icons, ResponsiveImage, Skeleton } from "@/components";

import { truncate, getDictionary } from "@/utils";
import { useGetProductsQuery } from "@/store/services";

const BestSellsSlider = (props) => {
  //? Props
  const { categorySlug, lang } = props;

  const { products, isLoading } = useGetProductsQuery(
    {
      sort: 2,
      category: categorySlug,
      page_size: 15,
    },
    {
      selectFromResult: ({ data, isLoading }) => ({
        products: data?.data?.products,
        isLoading,
      }),
    }
  );
  const trans = getDictionary(lang);

  //? Render(s)
  return (
    <section className="px-3">
      <div className="flex items-center mb-3 space-x-2">
        <Icons.Check className="w-7 h-7 text-amber-400" />
        <h4 className="text-xl">{trans.product.best_seller}</h4>
      </div>

      <div
        className={`grid grid-cols-[repeat(5,280px)] md:grid-cols-[repeat(5,300px)] grid-rows-3 xl:grid-cols-[repeat(5,330px)] grid-flow-col ${products?.length >= 5 ? "overflow-x-auto" : ""} gap-x-2 p-2`}
      >
        {isLoading
          ? Array(12)
              .fill("_")
              .map((_, index) => (
                <Skeleton.Items key={index} className="flex space-x-4 p-1">
                  <Skeleton.Item
                    height="h-24"
                    width="w-24"
                    animated="background"
                    className="rounded-md mx-auto"
                  />
                  <Skeleton.Item
                    height="h-5"
                    width="w-32"
                    animated="background"
                    className="mt-4 mx-auto"
                  />
                </Skeleton.Items>
              ))
          : products?.map((item, index) => (
              <div key={item.id} className="px-1 py-4 w-60 md:w-72 xl:w-80">
                <Link href={`/products/${item.id}`}>
                  <article className="flex space-x-4">
                    <ResponsiveImage
                      dimensions="w-24 h-24"
                      src={item.images[0].url}
                      alt={item.title}
                      className="shrink-0"
                    />
                    <div className="flex items-center border-b space-x-3">
                      <span className="text-2xl text-sky-500 ">
                        {index + 1}
                      </span>
                      <span>{truncate(item.title, 40)}</span>
                    </div>
                  </article>
                </Link>
              </div>
            ))}
      </div>
    </section>
  );
};

export default BestSellsSlider;
