"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModernTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  offset?: number;
  delayDuration?: number;
}

export function ModernTooltip({
  content,
  children,
  side = "right",
  align = "center",
  offset = 8,
  delayDuration = 300,
}: ModernTooltipProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = React.useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsOpen(true), delayDuration);
  }, [delayDuration]);

  const handleMouseLeave = React.useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsOpen(false), 100);
  }, []);

  React.useEffect(() => {
    const updatePosition = () => {
      if (!triggerRef.current) return;
      
      const rect = triggerRef.current.getBoundingClientRect();
      let x = 0;
      let y = 0;
      
      // Calculate position based on side and align
      switch (side) {
        case "top":
          y = rect.top - offset;
          break;
        case "bottom":
          y = rect.bottom + offset;
          break;
        case "left":
          x = rect.left - offset;
          break;
        case "right":
          x = rect.right + offset;
          break;
      }
      
      switch (align) {
        case "start":
          if (side === "top" || side === "bottom") {
            x = rect.left;
          } else {
            y = rect.top;
          }
          break;
        case "center":
          if (side === "top" || side === "bottom") {
            x = rect.left + rect.width / 2;
          } else {
            y = rect.top + rect.height / 2;
          }
          break;
        case "end":
          if (side === "top" || side === "bottom") {
            x = rect.right;
          } else {
            y = rect.bottom;
          }
          break;
      }
      
      setCoords({ x, y });
    };

    if (isOpen) {
      updatePosition();
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition);
    }

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [isOpen, side, align, offset]);

  // Animation variants
  const tooltipVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      ...(side === "top" && { y: 10 }),
      ...(side === "bottom" && { y: -10 }),
      ...(side === "left" && { x: 10 }),
      ...(side === "right" && { x: -10 }),
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      x: 0, 
      y: 0,
      transition: { 
        type: "spring",
        bounce: 0.3,
        duration: 0.4 
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: 0.2 } 
    }
  };

  // Calculate position styles
  const getPositionStyles = () => {
    const styles: React.CSSProperties = {
      position: "fixed",
      zIndex: 50,
      maxWidth: "280px",
    };
    
    switch (side) {
      case "top":
        styles.bottom = `calc(100% - ${coords.y}px)`;
        break;
      case "bottom":
        styles.top = `${coords.y}px`;
        break;
      case "left":
        styles.right = `calc(100% - ${coords.x}px)`;
        break;
      case "right":
        styles.left = `${coords.x}px`;
        break;
    }
    
    switch (align) {
      case "start":
        if (side === "top" || side === "bottom") {
          styles.left = `${coords.x}px`;
        } else {
          styles.top = `${coords.y}px`;
        }
        break;
      case "center":
        if (side === "top" || side === "bottom") {
          styles.left = `${coords.x}px`;
          styles.transform = "translateX(-50%)";
        } else {
          styles.top = `${coords.y}px`;
          styles.transform = "translateY(-50%)";
        }
        break;
      case "end":
        if (side === "top" || side === "bottom") {
          styles.left = `${coords.x}px`;
          styles.transform = "translateX(-100%)";
        } else {
          styles.top = `${coords.y}px`;
          styles.transform = "translateY(-100%)";
        }
        break;
    }
    
    return styles;
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        className="inline-block"
      >
        {children}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={tooltipVariants}
            style={getPositionStyles()}
          >
            <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg p-3 border border-gray-200 dark:border-gray-700 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}