import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Hero.module.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { t, i18n } = useTranslation();

  const slides = t('hero.slides', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    link: string;
    ctaText: string;
  }>;

  const slideImages = [
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80',
    './src/images/b2b.jpg',
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2000&q=80',
    './src/images/import-services.jpg'
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
    <div className={`${styles.heroContainer} relative h-[calc(100vh-4rem)] overflow-hidden`}>
      {/* Cinematic Noise Overlay */}
      <div className={styles.noiseOverlay} />
      
      {/* Film Grain */}
      <div className={styles.filmGrain} />
      
      {/* Vignette Effect */}
      <div className={styles.vignette} />

      {/* Slideshow */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
              currentSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            {/* Premium Gradient Overlays */}
            <div className={styles.gradientOverlay} />
            <div className={styles.cinematicOverlay} />
            
            <img
              src={slideImages[index]}
              alt={slide.title}
              className={`${styles.heroImage} h-full w-full object-cover object-center transition-transform duration-[8000ms] ease-out ${
                currentSlide === index ? 'scale-110' : 'scale-100'
              }`}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {/* Floating Particles */}
      <div className={styles.particles}>
        {[...Array(20)].map((_, i) => (
          <div key={i} className={styles.particle} style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className={`text-center text-white ${isLoaded ? styles.contentEnter : styles.contentHidden}`}>
            {/* Premium Badge */}
            <div className={styles.premiumBadge}>
              <span className={styles.badgeText}>PREMIUM TRADE SOLUTIONS</span>
            </div>
            
            <h1 className={`${styles.heroTitle} text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6`}>
              <span className={styles.titleGradient}>
                {slides[currentSlide].title}
              </span>
            </h1>
            
            <p className={`${styles.heroDescription} text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 sm:mb-12`}>
              {slides[currentSlide].description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link
                to={slides[currentSlide].link}
                className={`${styles.ctaButton} ${styles.primaryCta} group`}
              >
                <span className={`${styles.ctaContent} ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  {slides[currentSlide].ctaText}
                  {i18n.language === 'ar' ? (
                    <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:-translate-x-1" />
                  ) : (
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                  )}
                </span>
                <div className={styles.ctaGlow} />
              </Link>
              
              <button className={`${styles.ctaButton} ${styles.secondaryCta}`}>
                <span className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Watch Story
                </span>
              </button>
            </div>

            {/* Stats Bar */}
            <div className={styles.statsBar}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>15+</span>
                <span className={styles.statLabel}>Years Experience</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNumber}>500+</span>
                <span className={styles.statLabel}>Global Clients</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNumber}>30+</span>
                <span className={styles.statLabel}>Countries</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation */}
      <div className="hidden md:block">
        <button
          onClick={() => handleManualNavigation(prevSlide)}
          className={`${styles.navButton} ${styles.navPrev}`}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
          <div className={styles.navButtonGlow} />
        </button>
        <button
          onClick={() => handleManualNavigation(nextSlide)}
          className={`${styles.navButton} ${styles.navNext}`}
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
          <div className={styles.navButtonGlow} />
        </button>
      </div>

      {/* Play/Pause Control */}
      <button
        onClick={() => setIsPaused(!isPaused)}
        className={styles.playPauseButton}
        aria-label={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
      >
        {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
      </button>

      {/* Enhanced Slide Indicators */}
      <div className={`${styles.slideIndicators} ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => handleManualNavigation(() => setCurrentSlide(index))}
            className={`${styles.indicator} ${currentSlide === index ? styles.indicatorActive : ''}`}
            aria-label={`Go to slide ${index + 1}: ${slide.title}`}
          >
            <div className={styles.indicatorProgress} />
            <div className={styles.indicatorGlow} />
          </button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel} />
        </div>
        <span className={styles.scrollText}>Scroll to explore</span>
      </div>
    </div>
  );
};

export default Hero;