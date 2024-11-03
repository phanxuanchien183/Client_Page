import { Icons, Services, ResponsiveImage } from '@/components'
import { siteTitle } from '@/utils'
import { useTranslate } from '@/hooks'
import Link from 'next/link'

export default function Footer() {
  const trans = useTranslate()
  return (
    <footer className="pt-4 mt-8 border-t border-gray-200 bg-shalom-orange-100">
      <div className="container px-3  space-y-8 mx-auto ">
        {/* Logo & scroll to top */}
        <div className="flex justify-between">
          <div>
            <ResponsiveImage
              dimensions="w-32 h-10 mb-6"
              className="overflow-hidden"
              src="/logo-htshalom.png"
              alt={`HT Shalom`}
            />
            <div className="flex flex-col gap-y-2 lg:flex-row lg:space-x-5">
              <span>{trans.notification.we_answer_247}</span>
              <span className="hidden lg:block bg-gray-300 w-[2px]" />
              <span>{trans.notification.our_email}: nmphong0601.business@gmail.com</span>
            </div>
          </div>
          <div className="min-w-max">
            <button
              type="button"
              onClick={() => window.scrollTo(0, 0)}
              className="flex items-center px-3 py-1 border border-gray-300 rounded-md"
            >
              <span className="text-sm ">{trans.common.go_up}</span>
              <Icons.ArrowUp className="text-gray-400 h-7 w-7" />
            </button>
          </div>
        </div>

        <div className="hidden lg:block">
          <Services />
        </div>

        <div className="space-y-8 lg:flex lg:items-start lg:justify-between">
          {/* socials */}
          <div className="flex items-center justify-between">
            <p className="lg:mr-20">{trans.common.more_infor}</p>
            <div className="flex space-x-5">
              <Link target="_blank" href="https://twitter.com">
                <Icons.Twitter className="w-8 h-8 text-gray-400" />
              </Link>
              <Link target="_blank" href="https://www.linkedin.com">
                <Icons.Linkedin className="w-8 h-8 text-gray-400" />
              </Link>
              <Link target="_blank" href="https://www.instagram.com">
                <Icons.Instagram className="w-8 h-8 text-gray-400" />
              </Link>
              <Link target="_blank" href="https://www.youtube.com">
                <Icons.Youtube className="w-8 h-8 text-gray-400" />
              </Link>
            </div>
          </div>

          {/* Newslatter */}
          <div className="flex-1 max-w-lg">
            <form className="flex space-x-3">
              <input placeholder={trans.common.your_email} className="input" type="email" />
              <button
                type="submit"
                className="px-2 text-shalom-green-300 bg-shalom-green-500 rounded-md whitespace-nowrap"
              >
                {trans.common.send_your_email}
              </button>
            </form>
          </div>
        </div>

        {/* info */}
        <div className="space-y-6 lg:flex lg:justify-between">
          <div className="space-y-3 lg:max-w-2xl">
            <h5 className="font-semibold text-black">
              {siteTitle} - {trans.notification.introduce_title}
            </h5>
            <p className="text-justify text-gray-700">
              {trans.notification.introduce_description_1}{' '}
              {trans.notification.introduce_description_2}
            </p>
          </div>

          <div className="flex justify-center gap-x-2"></div>
        </div>
      </div>

      <div className="flex items-center justify-center py-3 mt-6 bg-shalom-footer-texture space-x-3">
        <ResponsiveImage
          dimensions="h-8 w-8"
          className="overflow-hidden border-2 border-shalom-green-500 rounded-full"
          src="/developer.png"
          alt={`NMP (Nguyen Minh Phong)`}
        />
        <p className="text-white">
          <span className="text-white">Development by</span>{' '}
          <a href="https://nmp-portfolio.vercel.app" target="_blank" className="text-shalom-green-500">
            NMP and PXC
          </a>
        </p>
      </div>
    </footer>
  )
}
