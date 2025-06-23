import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ServiceDetail from "./pages/ServiceDetail";
import ServicesPage from "./pages/Services";
import ProductsPage from "./pages/Products";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import { useTranslation } from "react-i18next";
import ChatWidget from "./components/chat/ChatWidget";
import AnimationObserver from "./components/AnimationObserver";

// Enhanced ScrollToTop component with loading state
const ScrollToTop = ({
  setIsLoading,
}: {
  setIsLoading: (loading: boolean) => void;
}) => {
  const { pathname, state } = useLocation();

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(
      () => {
        if (!state?.scrollTo) {
          window.scrollTo(0, 0);
        }
        setIsLoading(false);
      },
      state?.scrollTo ? 100 : 500,
    );

    return () => clearTimeout(timer);
  }, [pathname, setIsLoading, state]);

  return null;
};

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const { i18n } = useTranslation();

  // Enhanced language change handler with proper direction setting
  useEffect(() => {
    const handleLanguageChange = () => {
      setIsLoading(true);

      // Set document direction
      document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = i18n.language;

      // Allow time for DOM updates and reflow
      setTimeout(() => {
        setIsLoading(false);
      }, 800); // Slightly longer timeout for smoother transition
    };

    // Set initial direction
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  return (
    <BrowserRouter data-oid="yk-:8wt">
      {isLoading && (
        <div
          className="fixed inset-0 bg-white z-50 flex items-center justify-center"
          data-oid="lhl2_d7"
        >
          <LoadingSpinner data-oid="tc:ww16" />
        </div>
      )}
      <div
        className={`min-h-screen bg-white ${isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-300"}`}
        data-oid="1d-0tj3"
      >
        <ScrollToTop setIsLoading={setIsLoading} data-oid="ka3ju08" />
        <Navbar data-oid="mokn0o0" />
        <Routes data-oid="f97gm1c">
          <Route
            path="/"
            element={<Home data-oid="p:69n_h" />}
            data-oid="bvfup6z"
          />

          <Route
            path="/services/:serviceId"
            element={<ServiceDetail data-oid="ajyvq08" />}
            data-oid="2ea-ybq"
          />

          <Route
            path="/services"
            element={<ServicesPage data-oid="6.psixy" />}
            data-oid="zkx24_p"
          />

          <Route
            path="/products"
            element={<ProductsPage data-oid="ezbak6:" />}
            data-oid="f1npgq5"
          />
        </Routes>
        <Footer data-oid="wzo5fys" />
      </div>
      <ChatWidget data-oid="l_q87la" />
    </BrowserRouter>
  );
}

export default App;
