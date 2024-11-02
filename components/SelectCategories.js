'use client'

import { useEffect, useState } from 'react'

import { SelectBox } from 'components'

import { useGetCategoriesQuery } from '@/store/services'

const SelectCategories = props => {
  //? Props
  const { selectedCategories, setSelectedCategories } = props

  //? Get Categories Query
  const { categories } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      categories: data?.data?.categories,
    }),
  })

  //? States
  const [levelOneCategories, setLevelOneCategories] = useState([])

  const [levelTwoCategories, setLevelTwoCategories] = useState([])

  const [levelThreeCategories, setlevelThreeCategories] = useState([])

  //? Re-Renders
  useEffect(() => {
    if (categories && selectedCategories.levelOne?.id)
      setLevelTwoCategories(
        categories?.filter(cat => cat.parent === selectedCategories.levelOne?.id)
      )

    if (categories && selectedCategories.levelTwo?.id)
      setlevelThreeCategories(
        categories.filter(cat => cat.parent === selectedCategories.levelTwo?.id)
      )
  }, [categories, selectedCategories])

  useEffect(() => {
    if (categories) setLevelOneCategories(categories.filter(cat => cat.level === 1))
  }, [categories])

  //? Handlers
  const handleLevelOneChange = category =>
    setSelectedCategories({
      levelOne: category,
      levelTwo: {},
      levelThree: {},
    })

  const handleLevelTwoChange = category =>
    setSelectedCategories({
      ...selectedCategories,
      levelTwo: category,
      levelThree: {},
    })

  const handleLevelThreeChange = category =>
    setSelectedCategories({
      ...selectedCategories,
      levelThree: category,
    })

  //? Render(s)
  return (
    <div className="flex flex-wrap justify-evenly gap-y-6">
      <SelectBox
        value={selectedCategories.levelOne}
        list={levelOneCategories}
        onChange={handleLevelOneChange}
        placeholder="Phân loại 1"
      />

      <SelectBox
        value={selectedCategories.levelTwo}
        list={levelTwoCategories}
        onChange={handleLevelTwoChange}
        placeholder="Phân loại 2"
      />

      <SelectBox
        value={selectedCategories.levelThree}
        list={levelThreeCategories}
        onChange={handleLevelThreeChange}
        placeholder="Phân loại 3"
      />
    </div>
  )
}

export default SelectCategories
