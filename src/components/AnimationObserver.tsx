import React, { useEffect, useRef } from "react";

interface AnimationObserverProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

const AnimationObserver: React.FC<AnimationObserverProps> = ({
  children,
  className = "",
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px",
  triggerOnce = true,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");

            // Add stagger animation to children
            const staggerItems = entry.target.querySelectorAll(".stagger-item");
            staggerItems.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add("revealed");
              }, index * 100);
            });

            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            entry.target.classList.remove("revealed");

            // Remove stagger animation from children
            const staggerItems = entry.target.querySelectorAll(".stagger-item");
            staggerItems.forEach((item) => {
              item.classList.remove("revealed");
            });
          }
        });
      },
      {
        threshold,
        rootMargin,
      },
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return (
    <div ref={elementRef} className={`reveal ${className}`} data-oid="0a70xe7">
      {children}
    </div>
  );
};

export default AnimationObserver;
