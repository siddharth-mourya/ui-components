import { ExtendedRefs } from "@floating-ui/react";
import { useEffect } from "react";

const useoutsideClickHandler = (refs: ExtendedRefs<Element>, callback: () => void) => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          refs.reference.current &&
          refs.floating.current &&
          !refs.reference.current.contains(event.target as Node) &&
          !refs.floating.current.contains(event.target as Node)
        ) {
          {
            callback();
          }
        }
      };
    
      useEffect(() => {
          document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);
}

export default useoutsideClickHandler;
