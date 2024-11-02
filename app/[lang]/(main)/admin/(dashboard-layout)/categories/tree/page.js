'use client'

import { BigLoading, PageContainer } from 'components'

import { useGetCategoriesQuery } from '@/store/services'
import { useTitle, useTranslate } from '@/hooks'

export default function CategoriesTreePage() {
  const trans = useTranslate()
  useTitle(trans.category.chart_tree)
  //? Get Categories Data
  const { categoriesList, isLoading } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      categoriesList: data?.data?.categoriesList,
      isLoading,
    }),
  })
  console.log("categoriesList: ", categoriesList);

  //? Render(s)

  return (
    <main>
      {isLoading ? (
        <div className="px-3 py-20">
          <BigLoading />
        </div>
      ) : (
        <PageContainer title="Cây danh mục">
          <section className="p-3">
            <div className="space-y-8 text-white">
              <div className="flex text-gray-600 gap-x-3">
                <p className="flex items-center text-sm gap-x-1">
                  <span className="inline-block w-6 h-6 bg-red-500 rounded-md" />
                  {trans.category.level_1}
                </p>
                <p className="flex items-center text-sm gap-x-1">
                  <span className="inline-block w-6 h-6 bg-green-500 rounded-md" />
                  {trans.category.level_2}
                </p>
                <p className="flex items-center text-sm gap-x-1">
                  <span className="inline-block w-6 h-6 bg-blue-500 rounded-md" />
                  {trans.category.level_3}
                </p>
              </div>
              <ul className="space-y-8">
                {categoriesList &&
                  categoriesList.map(mainCategory => (
                    <li
                      key={mainCategory.id}
                      className="p-2 border border-gray-100 rounded-md shadow"
                    >
                      <div className="p-2 text-center bg-red-500 rounded">{mainCategory.name}</div>
                      <ul className="flex flex-wrap gap-x-4">
                        {mainCategory.children.map(parentCategory => (
                          <li key={parentCategory.id} className="flex-1">
                            <div className="p-2 mt-2 text-center bg-green-500 rounded">
                              {parentCategory.name}
                            </div>
                            <ul className="flex flex-wrap gap-x-4">
                              {parentCategory.children.map(child_category => (
                                <li key={child_category.id} className="flex-1">
                                  <div className="flex-1 p-2 mt-2 text-center bg-blue-500 rounded">
                                    {child_category.name}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
              </ul>
            </div>
          </section>
        </PageContainer>
      )}
    </main>
  )
}
