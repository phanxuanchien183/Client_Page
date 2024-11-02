'use client'
import { usePathname, useParams } from "next/navigation";
import Link from "next/link";
import { ResponsiveImage } from "components";

export default function Language() {
  const pathname = usePathname();
  const { lang } = useParams();
  
  const redirectedPathName = (locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div className="flex-center text-sm gap-x-3 lg:border lg:border-gray-300 lg:rounded-md">
      {lang === "en" ? (
        <Link
          href={redirectedPathName('vi')}
          locale={'vi'}
          className="flex-center gap-x-1"
        >
          <ResponsiveImage
            dimensions="w-8 h-8"
            className="overflow-hidden"
            src="/icons/en.png"
            alt={`English`}
          />
        </Link>
      ) : (
        <Link
          href={redirectedPathName('en')}
          locale={'en'}
          className="flex-center gap-x-1"
        >
          <ResponsiveImage
            dimensions="w-8 h-8"
            className="overflow-hidden"
            src="/icons/vi.png"
            alt={`Vietnamese`}
          />
        </Link>
      )}
    </div>
  );
}
