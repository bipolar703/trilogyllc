import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ServiceDetail from "./pages/ServiceDetail";
import ServicesPage from "./pages/Services";
import ProductsPage from "./pages/Products";
import BlogPage from "./pages/Blog";
import Urea46Page from "./pages/Urea46";
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
    <BrowserRouter>
      {isLoading && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
      <div
        className={`min-h-screen bg-white ${isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-300"}`}
      >
        <ScrollToTop setIsLoading={setIsLoading} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/services/:serviceId" element={<ServiceDetail />} />

          <Route path="/services" element={<ServicesPage />} />

          <Route path="/products" element={<ProductsPage />} />
          
          <Route path="/blog" element={<BlogPage />} />
          
          <Route path="/products/urea-46" element={<Urea46Page />} />
        </Routes>
        <Footer />
      </div>
      <ChatWidget />
    </BrowserRouter>
  );
}

export default App;
