"use client";

import Link from "next/link";
import { useGetCategoriesQuery, useGetSlidersQuery } from "@/store/services";
import { useTitle, useUrlQuery, useTranslate } from "@/hooks";
import {
  ResponsiveImage,
  EmptyCustomList,
  PageContainer,
  TableSkeleton,
} from "@/components";

const SlidersPage = () => {
  const trans = useTranslate();
  const query = useUrlQuery();
  const category_id = query?.category_id;
  const category_name = query?.category_name;

  //? Queries
  //*     Get Categories
  const { categories, isLoading: isLoading_get_categories } =
    useGetCategoriesQuery(undefined, {
      selectFromResult: ({ data, isLoading }) => ({
        categories: data?.data?.categories
          .filter((category) => category.level < 2)
          .sort((a, b) => a.level - b.level),
        isLoading,
        skip: !!category_id,
      }),
    });

  //*     Get Sliders
  const { data: sliders, isLoading: isLoadingGetSliders } = useGetSlidersQuery(
    { category: category_id },
    { skip: !!!category_id }
  );

  //? Render(s)
  const title = category_name
    ? `${trans.common.category_slider_management} - ${category_name}`
    : trans.common.slider_management;

  useTitle(title);

  const renderContent = () => {
    if (isLoading_get_categories || isLoadingGetSliders) {
      return (
        <tr>
          <td colSpan="4">
            <TableSkeleton />
          </td>
        </tr>
      );
    }

    if (categories && !category_id) {
      return categories.map((category) => (
        <tr
          className="text-xs text-center transition-colors border-b border-gray-100 md:text-sm hover:bg-gray-50/50"
          key={category.id}
        >
          <td className="w-3/4 px-2 py-4">{category.name}</td>
          <td className="px-2 py-4">
            <Link
              href={`/admin/sliders?category_id=${category.id}&category_name=${category.name}`}
              className="bg-rose-50 text-rose-500 rounded-sm py-1 px-1.5 mx-1.5 inline-block"
            >
              {trans.category.child_category}
            </Link>
          </td>
        </tr>
      ));
    }

    if (sliders && sliders.data && sliders.data.length > 0) {
      return sliders.data.map((slider) => (
        <tr
          className="text-xs text-center transition-colors border-b border-gray-100 md:text-sm hover:bg-gray-50/50"
          key={slider.id}
        >
          <td className="px-2 py-4">
            <ResponsiveImage
              dimensions="h-7 w-32"
              className="mx-auto"
              src={slider.image?.url}
              alt=""
            />
          </td>
          <td className="w-2/4 px-2 py-4">{slider.title}</td>
          <td className="px-2 py-4">
            <Link
              href={`/admin/sliders/edit/${slider.id}?slider_name=${slider.title}`}
              className="bg-rose-50 text-rose-500 rounded-sm py-1 px-1.5 mx-1.5 inline-block"
            >
              {trans.common.edit}
            </Link>
          </td>
        </tr>
      ));
    } else
      return (
        <tr>
          <td colSpan="4">
            <EmptyCustomList />
          </td>
        </tr>
      );
  };

  return (
    <main>
      <PageContainer title={title}>
        <section className="p-3 mx-auto mb-10 space-y-8">
          {category_id && (
            <Link
              href={`sliders/create?category_id=${category_id}&category_name=${category_name}`}
              className="flex items-center px-3 py-2 text-red-600 border-2 border-red-600 rounded-lg max-w-max gap-x-3"
            >
              {trans.slider.add}
            </Link>
          )}
          <div className="mx-3 overflow-x-auto mt-7 lg:mx-5 xl:mx-10">
            <table className="w-full whitespace-nowrap">
              <thead className="h-9 bg-emerald-50">
                <tr className="text-emerald-500">
                  {category_name && (
                    <th className="border-gray-100 border-x-2">{trans.common.image}</th>
                  )}
                  <th className="px-2 border-gray-100 border-x-2">
                    {category_name ? "Tiêu đề" : "Tên danh mục"}
                  </th>
                  <th className="border-gray-100 border-x-2">{trans.common.action}</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">{renderContent()}</tbody>
            </table>
          </div>
        </section>
      </PageContainer>
    </main>
  );
};

export default SlidersPage;
