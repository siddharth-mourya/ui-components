import {
  Placement,
  useFloating,
  useFocus,
  useInteractions,
} from "@floating-ui/react";
import styles from "./PopoverV2.module.scss";
import { useEffect } from "react";

interface PopoverProps {
  children: React.ReactNode;
  placement?: Placement;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  onClose: () => void;
}

const PopoverV2 = ({
  children,
  placement = "bottom",
  isOpen,
  setIsOpen,
  onClose,
}: PopoverProps) => {
  const { refs, floatingStyles, context } = useFloating({
    placement,
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const focus = useFocus(context, { enabled: true });
  const { getReferenceProps, getFloatingProps } = useInteractions([focus]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      refs.reference.current &&
      refs.floating.current &&
      !refs.reference.current.contains(event.target as Node) &&
      !refs.floating.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  console.log(refs, floatingStyles);
  return (
    <div className={styles.popoverContainer}>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className={styles.floatingElement}
          {...getFloatingProps()}
        >
          <div className={styles.content}>Floating content</div>
          <button onClick={onClose}>close</button>
        </div>
      )}
    </div>
  );
};
export default PopoverV2;
