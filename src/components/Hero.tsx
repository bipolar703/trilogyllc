import React, { useState, useEffect, useCallback } from "react";
import {
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Hero.module.css";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { t, i18n } = useTranslation();

  const slides = t("hero.slides", { returnObjects: true }) as Array<{
    title: string;
    description: string;
    link: string;
    ctaText: string;
  }>;

  const slideImages = [
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80",
    "./src/images/b2b.jpg",
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2000&q=80",
    "./src/images/import-services.jpg",
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const handleManualNavigation = useCallback((action: () => void) => {
    action();
    setIsPaused(true);
    setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isPaused) {
      timer = setInterval(nextSlide, 6000); // Slower for cinematic feel
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPaused, nextSlide]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      className={`${styles.heroContainer} relative h-[calc(100vh-4rem)] overflow-hidden`}
      data-oid="q9irebb"
    >
      {/* Cinematic Noise Overlay */}
      <div className={styles.noiseOverlay} data-oid="t7oumq4" />

      {/* Film Grain */}
      <div className={styles.filmGrain} data-oid="wk1rak-" />

      {/* Vignette Effect */}
      <div className={styles.vignette} data-oid="hrs85bc" />

      {/* Slideshow */}
      <div className="absolute inset-0" data-oid="fe-e-gk">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
              currentSlide === index
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
            data-oid="pg6gdmr"
          >
            {/* Premium Gradient Overlays */}
            <div className={styles.gradientOverlay} data-oid=":j:v7dm" />
            <div className={styles.cinematicOverlay} data-oid="z-3pnwa" />

            <img
              src={slideImages[index]}
              alt={slide.title}
              className={`${styles.heroImage} h-full w-full object-cover object-center transition-transform duration-[8000ms] ease-out ${
                currentSlide === index ? "scale-110" : "scale-100"
              }`}
              loading={index === 0 ? "eager" : "lazy"}
              data-oid="k4wkboh"
            />
          </div>
        ))}
      </div>

      {/* Floating Particles */}
      <div className={styles.particles} data-oid="rmz5df.">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
            data-oid="8pu.c8n"
          />
        ))}
      </div>

      {/* Content */}
      <div
        className="relative z-20 h-full flex items-center"
        data-oid="41hlm98"
      >
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
          data-oid="ux.7fbo"
        >
          <div
            className={`text-center text-white ${isLoaded ? styles.contentEnter : styles.contentHidden}`}
            data-oid="gqdyw9v"
          >
            {/* Premium Badge */}
            <div className={styles.premiumBadge} data-oid="9i5vl2p">
              <span className={styles.badgeText} data-oid="eqie4ji">
                PREMIUM TRADE SOLUTIONS
              </span>
            </div>

            <h1
              className={`${styles.heroTitle} text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6`}
              data-oid="-cy3ek4"
            >
              <span className={styles.titleGradient} data-oid="ol_gyv4">
                {slides[currentSlide].title}
              </span>
            </h1>

            <p
              className={`${styles.heroDescription} text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 sm:mb-12`}
              data-oid="5o10t0z"
            >
              {slides[currentSlide].description}
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
              data-oid="oble9n7"
            >
              <Link
                to={slides[currentSlide].link}
                className={`${styles.ctaButton} ${styles.primaryCta} group`}
                data-oid="1w3l237"
              >
                <span
                  className={`${styles.ctaContent} ${i18n.language === "ar" ? "flex-row-reverse" : ""}`}
                  data-oid="3g41oiz"
                >
                  {slides[currentSlide].ctaText}
                  {i18n.language === "ar" ? (
                    <ArrowLeft
                      className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:-translate-x-1"
                      data-oid="c2rjlqd"
                    />
                  ) : (
                    <ArrowRight
                      className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1"
                      data-oid="191kar1"
                    />
                  )}
                </span>
                <div className={styles.ctaGlow} data-oid="io:yv6a" />
              </Link>

              <button
                className={`${styles.ctaButton} ${styles.secondaryCta}`}
                data-oid="49.wkjp"
              >
                <span className="flex items-center gap-2" data-oid="mngg4t1">
                  <Play className="h-4 w-4" data-oid="da0o1._" />
                  Watch Story
                </span>
              </button>
            </div>

            {/* Stats Bar */}
            <div className={styles.statsBar} data-oid="33tfz85">
              <div className={styles.stat} data-oid="7hlypzd">
                <span className={styles.statNumber} data-oid="wuu27yb">
                  15+
                </span>
                <span className={styles.statLabel} data-oid="y:-_9i:">
                  Years Experience
                </span>
              </div>
              <div className={styles.statDivider} data-oid="cvt.rf8" />
              <div className={styles.stat} data-oid="22d2ar-">
                <span className={styles.statNumber} data-oid="35cj83m">
                  500+
                </span>
                <span className={styles.statLabel} data-oid="dn.837v">
                  Global Clients
                </span>
              </div>
              <div className={styles.statDivider} data-oid="hrtju8n" />
              <div className={styles.stat} data-oid="f-toios">
                <span className={styles.statNumber} data-oid="uzh_tzo">
                  30+
                </span>
                <span className={styles.statLabel} data-oid="ifn57kz">
                  Countries
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation */}
      <div className="hidden md:block" data-oid="3c8ms9h">
        <button
          onClick={() => handleManualNavigation(prevSlide)}
          className={`${styles.navButton} ${styles.navPrev}`}
          aria-label="Previous slide"
          data-oid="3let-7f"
        >
          <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" data-oid="16on97m" />
          <div className={styles.navButtonGlow} data-oid="nc-9t_j" />
        </button>
        <button
          onClick={() => handleManualNavigation(nextSlide)}
          className={`${styles.navButton} ${styles.navNext}`}
          aria-label="Next slide"
          data-oid="w6.tx:9"
        >
          <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" data-oid="0j6dorf" />
          <div className={styles.navButtonGlow} data-oid="2ab2c8u" />
        </button>
      </div>

      {/* Play/Pause Control */}
      <button
        onClick={() => setIsPaused(!isPaused)}
        className={styles.playPauseButton}
        aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"}
        data-oid="bi9ief7"
      >
        {isPaused ? (
          <Play className="h-4 w-4" data-oid="yeejov9" />
        ) : (
          <Pause className="h-4 w-4" data-oid="3l-e9x3" />
        )}
      </button>

      {/* Enhanced Slide Indicators */}
      <div
        className={`${styles.slideIndicators} ${i18n.language === "ar" ? "flex-row-reverse" : ""}`}
        data-oid="ph5n84w"
      >
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => handleManualNavigation(() => setCurrentSlide(index))}
            className={`${styles.indicator} ${currentSlide === index ? styles.indicatorActive : ""}`}
            aria-label={`Go to slide ${index + 1}: ${slide.title}`}
            data-oid="5tosv-n"
          >
            <div className={styles.indicatorProgress} data-oid="uqmsodh" />
            <div className={styles.indicatorGlow} data-oid="fn8g9in" />
          </button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator} data-oid="-xuvs.5">
        <div className={styles.scrollMouse} data-oid="ps.q0:p">
          <div className={styles.scrollWheel} data-oid="h_duqj3" />
        </div>
        <span className={styles.scrollText} data-oid="zl_uugi">
          Scroll to explore
        </span>
      </div>
    </div>
  );
};

export default Hero;
