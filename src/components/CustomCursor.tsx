import React, { useEffect, useState } from "react";
import styles from "./CustomCursor.module.css";

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.classList.contains("cursor-hover") ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.classList.contains("cursor-hover") ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(false);
      }
    };

    // Add event listeners
    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  return (
    <>
      <div
        className={`${styles.cursor} ${isHovering ? styles.hovering : ""} ${isClicking ? styles.clicking : ""}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        data-oid="5az1dgb"
      />

      <div
        className={`${styles.cursorTrail} ${isHovering ? styles.hovering : ""}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        data-oid="outxhy0"
      />
    </>
  );
};

export default CustomCursor;
