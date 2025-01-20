import React, { useRef, useEffect } from "react";

interface PopoverProps {
  align?: "start" | "center" | "end";
  alignOffset?: number;
  isOpen?: boolean;
  updatePopoverOpenState?: (isOpen: boolean) => void;
  position?: "left" | "right" | "top" | "bottom";
  positionOffset?: number;
  width?: number;
  className?: string;
  showCloseBtn?: boolean;
  children: React.ReactNode;
  triggerRef: React.RefObject<HTMLElement>;
}

const Popover: React.FC<PopoverProps> = ({
  align = "start",
  alignOffset = 0,
  isOpen = false,
  updatePopoverOpenState,
  position = "bottom",
  positionOffset = 0,
  width = "100%",
  className,
  showCloseBtn = false,
  children,
  triggerRef,
}) => {
  const popoverRef = useRef<HTMLElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      popoverRef.current &&
      triggerRef.current &&
      !popoverRef.current.contains(e.target as Node) &&
      !triggerRef.current?.contains(e.target as Node)
    ) {
      updatePopoverOpenState?.(false);
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
          tabIndex={0}
          ref={popoverRef as any}
          style={{ ...popoverStyles, position: "absolute" }}
          className="popover"
        >
          {showCloseBtn && (
            <button
              onClick={() => {
                updatePopoverOpenState?.(false);
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
