import { siteTitle } from '@/utils'

export async function generateMetadata({ params: { lang } }) {
  return {
    title: `${lang === "vi" ? "Thanh toán" : "Checkout"} - ${siteTitle}`,
  };
}

export default function Layout({ children }) {
  return <>{children}</>
}
