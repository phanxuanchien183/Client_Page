import en from "../public/languages/en.js";
import vi from "../public/languages/vi.js";

export default function getDictionary(locale) {
  return locale === 'vi' ? vi : en;
}