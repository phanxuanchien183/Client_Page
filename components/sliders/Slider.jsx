'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay, EffectFade } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

import { ResponsiveImage } from '@/components'

const Slider = props => {
  //? Props
  const { data } = props

  const SliderImage = ({ item }) => (
    <ResponsiveImage
      dimensions="w-full h-64 md:h-72 lg:h-[500px]"
      imageStyles="object-cover object-[72%] lg:object-center z-0"
      width={0}
      height={0}
      sizes="100vw"
      src={`/assets/images/${item?.image?.url}`}
      alt={item.title}
    />
  )

  //? Render(s)
  if (data?.length === 0) return null

  return (
    <section className="lg:mx-3">
      <Swiper
        effect="fade"
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Navigation, Autoplay, EffectFade]}
        className="mySwiper overflow-hidden lg:rounded-2xl"
      >
        {data
          .filter(item => item.published)
          .map((item, index) => (
            <SwiperSlide key={index}>
              {item.uri ? (
                <a href={item.uri} target="_blank" className="">
                  <SliderImage item={item} />
                </a>
              ) : (
                <SliderImage item={item} />
              )}
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  )
}

export default Slider
