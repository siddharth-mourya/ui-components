import React, { useEffect, useRef } from "react";
import "./Popover.css";

interface PopoverProps {
  isOpen: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  anchorRef: React.RefObject<HTMLElement>;
  align?: "start" | "center" | "end";
  alignOffset?: number;
  position?: "top" | "bottom" | "left" | "right";
  positionOffset?: number;
  width?: number | "anchor"; // Full width of anchor or custom width
  className?: string;
  showCloseBtn?: boolean;
  children: React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({
  isOpen,
  onOpenChange,
  anchorRef,
  align = "center",
  alignOffset = 0,
  position = "bottom",
  positionOffset = 0,
  width = "anchor",
  className,
  showCloseBtn = false,
  children,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  // Ensure anchor element has `position: relative` if necessary
  useEffect(() => {
    if (anchorRef.current) {
      const style = getComputedStyle(anchorRef.current);
      if (style.position === "static") {
        anchorRef.current.style.position = "relative";
      }
    }
  }, [anchorRef]);

  // Handle closing on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !anchorRef.current?.contains(event.target as Node)
      ) {
        onOpenChange?.(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, anchorRef, onOpenChange]);

  if (!isOpen || !anchorRef.current) return null;

  // Calculate position
  const anchorRect = anchorRef.current.getBoundingClientRect();
  console.log(anchorRect);
  const popoverStyles: React.CSSProperties = {
    position: "absolute",
    width: width === "anchor" ? `${anchorRect.width}px` : `${width}px`,
  };

  // Calculate top and left based on anchorRect and desired position
  switch (position) {
    case "top":
      popoverStyles.top = `${
        anchorRect.top -
        (popoverRef.current?.offsetHeight || 0) -
        positionOffset
      }px`;
      popoverStyles.left = `${anchorRect.left}px`;
      break;
    case "bottom":
      popoverStyles.top = `${anchorRect.bottom + positionOffset}px`;
      popoverStyles.left = `${anchorRect.left}px`;
      break;
    case "left":
      popoverStyles.top = `${anchorRect.top}px`;
      popoverStyles.left = `${
        anchorRect.left -
        (popoverRef.current?.offsetWidth || 0) -
        positionOffset
      }px`;
      break;
    case "right":
      popoverStyles.top = `${anchorRect.top}px`;
      popoverStyles.left = `${anchorRect.right + positionOffset}px`;
      break;
    default:
      popoverStyles.top = `${anchorRect.bottom + positionOffset}px`;
      popoverStyles.left = `${anchorRect.left}px`;
  }

  // Handle alignment for top/bottom and left/right positions
  if (["top", "bottom"].includes(position)) {
    if (align === "start") {
      popoverStyles.left = `${anchorRect.left + alignOffset}px`;
    } else if (align === "center") {
      popoverStyles.left = `${
        anchorRect.left +
        anchorRect.width / 2 -
        (popoverRef.current?.offsetWidth || 0) / 2 +
        alignOffset
      }px`;
    } else if (align === "end") {
      popoverStyles.left = `${
        anchorRect.left +
        anchorRect.width -
        (popoverRef.current?.offsetWidth || 0) +
        alignOffset
      }px`;
    }
  } else {
    if (align === "start") {
      popoverStyles.top = `${anchorRect.top + alignOffset}px`;
    } else if (align === "center") {
      popoverStyles.top = `${
        anchorRect.top +
        anchorRect.height / 2 -
        (popoverRef.current?.offsetHeight || 0) / 2 +
        alignOffset
      }px`;
    } else if (align === "end") {
      popoverStyles.top = `${
        anchorRect.top +
        anchorRect.height -
        (popoverRef.current?.offsetHeight || 0) +
        alignOffset
      }px`;
    }
  }

  return (
    <div
      ref={popoverRef}
      className={`popover ${className || ""}`}
      style={popoverStyles}
    >
      {showCloseBtn && (
        <button
          className="popover-close-btn"
          onClick={() => onOpenChange?.(false)}
        >
          ✕
        </button>
      )}
      {children}
    </div>
  );
};

export default Popover;
