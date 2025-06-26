import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import Contact from "../components/Contact";
import AnimationObserver from "../components/AnimationObserver";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      if (location.state?.scrollTo) {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          // Clear any existing timeout
          if (scrollTimeout) clearTimeout(scrollTimeout);

          // Wait for content to load and then scroll
          scrollTimeout = setTimeout(() => {
            const headerOffset = 80; // Adjust based on your header height
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });

            // Clean up the state after successful scroll
            window.history.replaceState({}, document.title);
          }, 300); // Increased delay to ensure content is loaded
        }
      }
    };

    // Initial scroll attempt
    handleScroll();

    // Cleanup
    return () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [location]);

  return (
    <main className="bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <section aria-label="Hero section">
        <Hero />
      </section>
      
      {/* Services Section with modern spacing */}
      <section 
        aria-label="Our services" 
        className="py-16 md:py-24 lg:py-32 relative"
        style={{
          scrollMarginTop: '80px' // For smooth scroll offset
        }}
      >
        <AnimationObserver>
          <Services />
        </AnimationObserver>
      </section>
      
      {/* About Section with enhanced spacing */}
      <section 
        aria-label="About us" 
        className="py-16 md:py-24 lg:py-32 relative"
        style={{
          scrollMarginTop: '80px'
        }}
      >
        <AnimationObserver>
          <About />
        </AnimationObserver>
      </section>
      
      {/* Contact Section with proper bottom spacing */}
      <section 
        aria-label="Contact us" 
        className="py-16 md:py-24 lg:py-32 pb-20 md:pb-32 relative"
        style={{
          scrollMarginTop: '80px'
        }}
      >
        <AnimationObserver>
          <Contact />
        </AnimationObserver>
      </section>
    </main>
  );
};

export default Home;
