import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
let locales = ['en', 'vi'];
let defaultLocale = 'en';
const cookieName = "i18nlang";

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest): string {
  // Get locale from cookie
  if (request.cookies.has(cookieName)) {
    return request.cookies.get(cookieName)!.value;
  }
  // Get accept language from HTTP headers
  const acceptLang = request.headers.get("Accept-Language");
  if (!acceptLang) return defaultLocale;
  // Get match locale
  const headers = { "accept-language": acceptLang };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/_next")) return NextResponse.next();

  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(request.nextUrl.pathname)
  ) {
    return;
  }

  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  let currentLocale = '';
  if (pathnameHasLocale) {
    currentLocale =
      locales.find(
        (locale) =>
          pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
      ) || defaultLocale;
    const response = NextResponse.next();
    response.cookies.set(cookieName, currentLocale);
    return response;
  }
  
  // Redirect if there is no locale
  currentLocale = getLocale(request);
  request.nextUrl.pathname = `/${currentLocale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  const response = NextResponse.redirect(request.nextUrl);
  // Set locale to cookie
  response.cookies.set(cookieName, currentLocale);
  return response;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, assets, api)
    '/((?!api|assets|.*\\..*|_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}