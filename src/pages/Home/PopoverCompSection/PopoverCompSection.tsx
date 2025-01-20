import React, { useState, useRef, useEffect } from "react";
import Popover from "../../../component/Popover/Popover";

const PopoverCompSection = () => {
  const [inputValue, setInputValue] = useState("");
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <h3>Popover Component 1</h3>
      <input
        value={inputValue}
        ref={inputRef}
        onFocus={() => setPopoverOpen(true)}
        onChange={(e: any) => setInputValue(e.target.value)}
        placeholder="Focus to open popover"
        style={{ position: "relative", width: "400px", padding: "10px" }}
      />
      <Popover
        position="bottom"
        triggerRef={inputRef}
        width={inputRef.current?.offsetWidth || 200} // Use a fallback if needed
        align="start"
        showCloseBtn={true}
        isOpen={isPopoverOpen}
        updatePopoverOpenState={(open) => setPopoverOpen(open)}
      >
        <h1>hello popover content</h1>
      </Popover>
    </div>
  );
};

export default PopoverCompSection;
