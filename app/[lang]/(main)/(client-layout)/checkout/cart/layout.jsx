import { siteTitle } from '@/utils'

export async function generateMetadata({ params: { lang } }) {
  return {
    title: `${lang === "vi" ? "Giỏ hàng" : "Cart"} - ${siteTitle}`,
  };
}

export default function Layout({ children }) {
  return <>{children}</>
}
