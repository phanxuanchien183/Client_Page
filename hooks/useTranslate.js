import { useParams } from "next/navigation";
import en from "../public/languages/en.js";
import vi from "../public/languages/vi.js";

const useTranslate = () => {
  const { lang } = useParams();

  const trans = lang === "vi" ? vi : en;

  return trans;
};

export default useTranslate;
