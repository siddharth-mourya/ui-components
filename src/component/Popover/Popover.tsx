import React, { useState, useRef, useEffect } from "react";

interface PopoverProps {
  align?: "start" | "center" | "end";
  alignOffset?: number;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  position?: "left" | "right" | "top" | "bottom";
  positionOffset?: number;
  width?: number;
  className?: string;
  showCloseBtn?: boolean;
  children: React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({
  align = "start",
  alignOffset = 0,
  isOpen = false,
  onOpenChange,
  position = "bottom",
  positionOffset = 0,
  width = "100%",
  className,
  showCloseBtn = false,
  children,
}) => {
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      popoverRef.current &&
      triggerRef.current &&
      !popoverRef.current.contains(e.target as Node) &&
      !triggerRef.current?.contains(e.target as Node)
    ) {
      onOpenChange?.(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popoverRef, triggerRef]);

  const popoverStyles = {
    width: `${width}px`,
    top:
      position === "top" && triggerRef.current
        ? `${triggerRef.current?.offsetTop - positionOffset}px`
        : "auto",
    bottom:
      position === "bottom" && triggerRef.current
        ? `${
            triggerRef.current?.offsetTop +
            triggerRef.current?.offsetHeight +
            positionOffset
          }px`
        : "auto",
    left:
      position === "left" && triggerRef.current
        ? `${triggerRef.current?.offsetLeft - positionOffset}px`
        : "auto",
    right:
      position === "right" && triggerRef.current
        ? `${
            triggerRef.current?.offsetLeft +
            triggerRef.current?.offsetWidth +
            positionOffset
          }px`
        : "auto",
    // left: align === "start" ? "0" : align === "center" ? "50%" : "100%",
    transform: align === "center" ? "translateX(-50%)" : "",
    border: "1px solid #ccc",
  };

  return (
    <div className={className}>
      {isOpen && (
        <div
          ref={popoverRef}
          style={{ ...popoverStyles, position: "absolute" }}
          className="popover"
        >
          {showCloseBtn && (
            <button
              onClick={() => {
                onOpenChange?.(false);
              }}
              className="close-btn"
            >
              X
            </button>
          )}
          {children}
        </div>
      )}
    </div>
  );
};

export default Popover;
