import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

interface LanguageSwitcherProps {
  scrolled?: boolean;
}

const LanguageSwitcher = ({ scrolled = false }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    document.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`
        flex items-center space-x-2 rtl:space-x-reverse transition-colors duration-200
        ${scrolled ? "text-gray-600 hover:text-brand-gold" : "text-white hover:text-brand-gold"}
      `}
      aria-label={
        i18n.language === "en" ? "Switch to Arabic" : "Switch to English"
      }
    >
      <Globe className="h-5 w-5" />
      <span>{i18n.language === "en" ? "العربية" : "English"}</span>
    </button>
  );
};

export default LanguageSwitcher;
