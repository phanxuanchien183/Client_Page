import "/styles/main.css";
import "/styles/browser-styles.css";
import "/styles/swiper.css";

import { enSiteTitle, siteDescription, siteTitle } from "@/utils";

interface LangParams {
  lang: string;
}
export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "vi" }];
}

export const metadata = {
  title: `${siteTitle} | ${enSiteTitle}`,
  description: `${siteDescription}`,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: LangParams;
}>) {
  return (
    <html lang={params.lang} suppressHydrationWarning={true}>
      <body>{children}</body>
    </html>
  );
}
