import { useEffect, useRef, useState } from "react";

// Below is a custom hook that will be used to show a scroll
// down button when the user scrolls down the page.
// This hook will be used in the Header component of the Home page.

// It uses the IntersectionObserver API to check if the parent element
// is in the viewport and if nothing else is visible below it.

// If the above conditions are met, the button will be visible.

// The button will be hidden when the user scrolls up or when
// another element is visible below the parent element.

const useScrollDownButton = () => {
  const topRef = useRef<HTMLDivElement>(null);
  const belowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const topObserver = new IntersectionObserver(
      ([entry]) => {
        // Check if parent element is in viewport and nothine else is visible below
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        root: null, // viewport is the root
        threshold: 1.0, // Fully visible
      }
    );

    const belowObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(false);
        }
      },
      {
        root: null,
        // Below threshold ensures that above will be triggered when even a small part of the  below element is visible
        threshold: 0.1,
      }
    );

    if (topRef.current) {
      topObserver.observe(topRef.current);
    }
    if (belowRef.current) {
      belowObserver.observe(belowRef.current);
    }

    return () => {
      topObserver.disconnect();
      belowObserver.disconnect();
    };
  }, []);

  return { topRef, belowRef, isVisible };
};
export default useScrollDownButton;
