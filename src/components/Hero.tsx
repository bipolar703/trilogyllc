import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Hero.module.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
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
    // Resume auto-sliding after 5 seconds of inactivity
    setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isPaused) {
      timer = setInterval(nextSlide, 5000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPaused, nextSlide]);

  return (
    <div className="relative h-[calc(100vh-4rem)]">
      {/* Slideshow */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />
            <img
              src={slideImages[index]}
              alt={slide.title}
              className="h-full w-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 w-full">
          <div className="text-center text-white">
            {/* Apply heading font */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-4 sm:mb-6 transition-all duration-500 transform">
              {slides[currentSlide].title}
            </h1>
            {/* Apply sans font explicitly for clarity */}
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-brand-yellow font-sans">
              {slides[currentSlide].description}
            </p>
            <Link
              to={slides[currentSlide].link}
              className={`${styles.ctaButton} group`}
            >
              <span className={`${styles.ctaContent} ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
                {slides[currentSlide].ctaText}
                {i18n.language === 'ar' ? (
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:-translate-x-1" />
                ) : (
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                )}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="hidden md:block">
        <button
          onClick={() => handleManualNavigation(prevSlide)}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-1 sm:p-2 rounded-full bg-brand-gold/30 text-white hover:bg-brand-gold/50 transition-all duration-200" /* Adjusted opacity */
          aria-label="Previous slide"
          title="View previous slide"
        >
          <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
        </button>
        <button
          onClick={() => handleManualNavigation(nextSlide)}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-1 sm:p-2 rounded-full bg-brand-gold/30 text-white hover:bg-brand-gold/50 transition-all duration-200" /* Adjusted opacity */
          aria-label="Next slide"
          title="View next slide"
        >
          <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div 
        className={`
          absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 
          flex gap-2 sm:gap-3 rtl:space-x-0
          ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}
        `}
      >
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => handleManualNavigation(() => setCurrentSlide(index))}
            className={`
              h-2 sm:h-3 rounded-full transition-all duration-300 ease-in-out
              ${currentSlide === index 
                ? 'bg-brand-gold w-6 sm:w-8' 
                : 'bg-white/60 hover:bg-white/80 w-2 sm:w-3'
              }
            `}
            aria-label={`Go to slide ${index + 1}: ${slide.title}`}
            title={`View slide: ${slide.title}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;

