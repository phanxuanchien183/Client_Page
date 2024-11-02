export async function generateMetadata({ params: { lang } }) {
  return {
    title: lang === "vi" ? "Đăng ký" : "Register",
  };
}

export default function LoginLayout({ children }) {
  return <>{children}</>
}
