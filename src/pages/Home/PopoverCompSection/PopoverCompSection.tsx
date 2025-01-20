import React, { useState, useRef } from "react";
import Popover from "../../../component/Popover/Popover";

const PopoverCompSection = () => {
  const [inputValue, setInputValue] = useState("");

  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <br />
      <input
        value={inputValue}
        ref={inputRef}
        onFocus={() => setPopoverOpen(true)}
        onBlur={() => setPopoverOpen(false)}
        onChange={(e: any) => setInputValue(e.target.value)}
        placeholder="Focus to open popover"
        style={{ position: "relative", width: "400px", padding: "10px" }}
      />
      <Popover
        position="bottom"
        width={inputRef.current?.offsetWidth || 0}
        // width={200}
        align="start"
        showCloseBtn={true}
        isOpen={isPopoverOpen}
        onOpenChange={(open) => setPopoverOpen(open)}
      >
        <h1>hello popovber content</h1>
      </Popover>
    </div>
  );
};

export default PopoverCompSection;
