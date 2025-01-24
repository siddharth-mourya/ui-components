import {
  Placement,
  useDismiss,
  useFloating,
  useFocus,
  useInteractions,
} from "@floating-ui/react";
import styles from "./Popover.module.scss";
import { useState } from "react";

interface PopoverProps {
  children: React.ReactNode;
  placement?: Placement;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  onOpenChange: (popoverOpen: boolean) => void;
}

const Popover = ({
  children,
  placement = "bottom",
  isOpen,
  setIsOpen,
  onOpenChange,
}: PopoverProps) => {
  // This is the local state for the popover if someone doesn't pass the isOpen and setIsOpen props
  const [open, setOpen] = useState(false);

  // This is to make sure that the we are using the isOpen and setIsOpen from the props if they are passed
  // otherwise we are using the local state and setState
  const popoveropen = isOpen ?? open;
  const popoverSetOpen = setIsOpen ?? setOpen;

  // This is the hook which gives us the reference element and the floating element and the context
  const { refs, floatingStyles, context } = useFloating({
    placement,
    open: popoveropen,
    onOpenChange: (isOpen) => {
      popoverSetOpen(isOpen);
      onOpenChange(isOpen);
    },
  });

  // applying this useFocus - we don't need to write setOpen on focus of input element it automatically sets the things to reference element and we can move the open state
  // logic to this component only and make open and setOpen as optional prop -
  const focus = useFocus(context);

  //  we also don't need to use this useoutsideClickHandler as we have useDismiss hook which does the same thing as useoutsideClickHandler
  const dismiss = useDismiss(context);

  // This gives us the reference props and floating props, based on all the interaction hooks we have used
  const { getReferenceProps, getFloatingProps } = useInteractions([
    focus,
    dismiss,
  ]);

  return (
    <div className={styles.popoverContainer}>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>

      {context.open && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className={styles.floatingElement}
          {...getFloatingProps()}
        >
          <div className={styles.content}>Floating content</div>
          <button onClick={() => popoverSetOpen(false)}>close</button>
        </div>
      )}
    </div>
  );
};
export default Popover;
