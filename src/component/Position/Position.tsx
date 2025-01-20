import React, { useRef, useEffect, useState } from "react";

type PopperProps = {
  position: "left" | "right" | "top" | "bottom";
  children: React.ReactNode;
};

const Popper: React.FC<PopperProps> = ({ position, children }) => {
  const relativeRef = useRef<HTMLDivElement>(null); // Reference for the relative element
  const popperRef = useRef<HTMLDivElement>(null); // Reference for the popper element
  const [styles, setStyles] = useState<React.CSSProperties>({}); // Dynamic styles

  useEffect(() => {
    if (relativeRef.current && popperRef.current) {
      const relativeRect = relativeRef.current.getBoundingClientRect();
      const popperRect = popperRef.current.getBoundingClientRect();

      let top = 0,
        left = 0;

      // Calculate position based on the provided position prop
      switch (position) {
        case "left":
          top =
            relativeRect.top +
            window.scrollY +
            relativeRect.height / 2 -
            popperRect.height / 2;
          left = relativeRect.left + window.scrollX - popperRect.width;
          break;
        case "right":
          top =
            relativeRect.top +
            window.scrollY +
            relativeRect.height / 2 -
            popperRect.height / 2;
          left = relativeRect.left + window.scrollX + relativeRect.width;
          break;
        case "top":
          top = relativeRect.top + window.scrollY - popperRect.height;
          left =
            relativeRect.left +
            window.scrollX +
            relativeRect.width / 2 -
            popperRect.width / 2;
          break;
        case "bottom":
          top = relativeRect.top + window.scrollY + relativeRect.height;
          left =
            relativeRect.left +
            window.scrollX +
            relativeRect.width / 2 -
            popperRect.width / 2;
          break;
        default:
          break;
      }

      setStyles({
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
      });
    }
  }, [position]);

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      ref={relativeRef}
    >
      <div ref={popperRef} style={styles}>
        {children}
      </div>
      Relative Element {/* Replace with the actual relative element content */}
    </div>
  );
};

export default Popper;
