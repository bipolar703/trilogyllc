import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, To, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MainLogo from "../images/mainlogo.svg";
import MainLogoAr from "../images/mainlogoar.svg";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  // Handle scroll events
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      // Determine if we're at the top of the page
      if (currentScrollY < 50) {
        setScrolled(false);
        setScrollDirection("up");
        return;
      }

      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      // Set scrolled state
      setScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const handleNavigation = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    path: To,
  ) => {
    e.preventDefault();
    setIsOpen(false);
    if (typeof path === "string" && path.startsWith("/#")) {
      const sectionId = path.replace("/#", "");
      if (location.pathname === "/") {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        await navigate("/", { state: { scrollTo: sectionId } });
      }
    } else {
      navigate(path);
    }
  };

  const navItems = [
    { id: "services", path: "/services", messageId: "nav.services" },
    { id: "about", path: "/#about", messageId: "nav.about" },
    { id: "contact", path: "/#contact", messageId: "nav.contact" },
  ];

  const navClasses = `
    fixed w-full transition-all duration-300 z-50
    ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"}
    ${scrollDirection === "down" && scrolled ? "-translate-y-full" : "translate-y-0"}
  `;

  return (
    <nav className={navClasses} data-oid="sf6ui4.">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        data-oid="5hnj6cg"
      >
        <div
          className={`flex items-center justify-between h-16 ${currentLang === "ar" ? "flex-row-reverse" : ""}`}
          data-oid="wbzevel"
        >
          {/* Logo */}
          <div className="flex-shrink-0" data-oid=".lxpa4-">
            <Link to="/" className="block" data-oid="wq7m_xv">
              <img
                src={currentLang === "ar" ? MainLogoAr : MainLogo}
                alt="Trilogy Trading"
                className={`h-12 transition-all duration-300 ${
                  scrolled
                    ? "[filter:brightness(0)_saturate(100%)_invert(20%)_sepia(10%)_saturate(500%)_hue-rotate(180deg)_brightness(95%)_contrast(90%)]"
                    : "brightness-100"
                }`}
                data-oid="ri-4y8x"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block" data-oid="hurz45p">
            <div
              className={`flex items-center gap-x-8 ${currentLang === "ar" ? "flex-row-reverse" : ""}`}
              data-oid="z0q3_b2"
            >
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={(e) => handleNavigation(e, item.path)}
                  className={`
                    text-base font-medium capitalize transition-colors duration-200
                    ${scrolled ? "text-gray-600 hover:text-brand-gold" : "text-white hover:text-brand-gold"}
                    ${location.pathname === item.path ? "text-brand-gold" : ""}
                  `}
                  data-oid="to.l31b"
                >
                  {t(item.messageId)}
                </Link>
              ))}
              <div
                className={`${currentLang === "ar" ? "mr-4" : "ml-4"}`}
                data-oid="3rpt0ak"
              >
                <LanguageSwitcher scrolled={scrolled} data-oid="eodx:.6" />
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div
            className={`md:hidden ${currentLang === "ar" ? "order-first" : "order-last"}`}
            data-oid="ajdb7:r"
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`
                inline-flex items-center justify-center p-2 rounded-md
                ${scrolled ? "text-gray-400 hover:text-brand-gold hover:bg-gray-100" : "text-white hover:text-brand-gold"}
                focus:outline-none transition duration-150 ease-in-out
              `}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              data-oid="7-ye6fm"
            >
              {isOpen ? (
                <X
                  className="block h-6 w-6"
                  aria-hidden="true"
                  data-oid="utunkl8"
                />
              ) : (
                <Menu
                  className="block h-6 w-6"
                  aria-hidden="true"
                  data-oid="l4og461"
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden" data-oid="jyet445">
          <div
            className={`
            px-4 pt-2 pb-3 space-y-1 bg-white/90 backdrop-blur-md shadow-sm
            ${currentLang === "ar" ? "text-right" : "text-left"}
          `}
            data-oid="7md4:uy"
          >
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`
                  block py-2 px-3 rounded-md text-base font-medium
                  ${location.pathname === item.path ? "text-brand-gold bg-gray-50" : "text-gray-600"}
                  hover:text-brand-gold hover:bg-gray-50
                `}
                onClick={(e) => {
                  setIsOpen(false);
                  handleNavigation(e, item.path);
                }}
                data-oid="fyljt:z"
              >
                {t(item.messageId)}
              </Link>
            ))}
            <div
              className={`py-2 px-3 ${currentLang === "ar" ? "text-right" : "text-left"}`}
              data-oid="j-mvoxz"
            >
              <LanguageSwitcher scrolled={true} data-oid="biy._j." />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
