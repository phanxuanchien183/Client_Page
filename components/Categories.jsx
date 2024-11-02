import Link from 'next/link'

import { ResponsiveImage } from '@/components'
import getSlug from "@/utils"

const Categories = props => {
  //? Props
  const { homePage, childCategories } = props

  //? Re-Renders
  if (childCategories.categories.length > 0) {
    return (
      <section className="px-3">
        <h4 className="mb-3 text-xl text-center">
          {childCategories.title}
        </h4>
        <div className="flex flex-wrap justify-center gap-4 mx-auto space-x-4 w-fit">
          {childCategories.categories.map((item, index) => (
            <div key={index} className="text-center">
              <Link
                href={homePage ? `/main/${item.slug}` : `/products?category=${item.slug}`}
                className="text-center"
              >
                <ResponsiveImage
                  dimensions="w-24 h-24 lg:h-44 lg:w-44"
                  imageStyles="object-cover rounded-xl"
                  className="mx-auto mb-1"
                  width={0}
                  height={0}
                  sizes="100vw"
                  src={`/assets/images/category/${getSlug(item.name)}.png`}
                  alt={item.name}
                />
                <span className="text-sm text-black">{item.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </section>
    )
  }
  return null
}

export default Categories
