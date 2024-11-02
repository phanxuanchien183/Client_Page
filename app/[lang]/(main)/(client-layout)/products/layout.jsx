import { siteTitle } from '@/utils'

export async function generateMetadata({ params: { lang } }) {
  return {
    title: `${lang === "vi" ? "Sản phẩm" : "Product"} - ${siteTitle}`,
  };
}

export default function Layout({ children }) {
  return <>{children}</>
}
