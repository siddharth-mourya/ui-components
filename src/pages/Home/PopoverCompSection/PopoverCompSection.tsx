import React, { useState, useRef } from "react";
import Popover from "../../../component/Popover/Popover";

const PopoverCompSection = () => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div style={{ padding: "100px" }}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Click or focus me"
        onFocus={() => setPopoverOpen(true)}
        // onBlur={(e) => {
        //   // Only close if focus is outside of popover
        //   if (!e.relatedTarget?.closest(".popover")) {
        //     setPopoverOpen(false);
        //   }
        // }}
        style={{ padding: "8px", width: "200px" }}
      />
      <Popover
        isOpen={isPopoverOpen}
        onOpenChange={setPopoverOpen}
        anchorRef={inputRef}
        align="center"
        position="bottom"
        positionOffset={8}
        width="anchor"
        showCloseBtn
      >
        <div>
          <p>This is your custom content!</p>
          <button onClick={() => alert("Button clicked!")}>Click me</button>
        </div>
      </Popover>
    </div>
  );
};

export default PopoverCompSection;
