export async function generateMetadata({ params: { lang } }) {
  return {
    title: lang === "vi" ? "Đăng nhập" : "Login",
  };
}

export default function LoginLayout({ children }) {
  return <>{children}</>
}
