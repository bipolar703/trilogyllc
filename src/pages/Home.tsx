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
    <main data-oid=":0nbpeh">
      <Hero data-oid="p-w2.b8" />
      <AnimationObserver data-oid="8ccp:79">
        <Services data-oid="_-di6bd" />
      </AnimationObserver>
      <AnimationObserver data-oid="o16ea90">
        <About data-oid="bzo6ouy" />
      </AnimationObserver>
      <AnimationObserver data-oid="ftk4:d4">
        <Contact data-oid="q4ved_p" />
      </AnimationObserver>
    </main>
  );
};

export default Home;
