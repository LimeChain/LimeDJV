import React from "react";
import { useEffect, useState } from "react";

export const useDetectOutsideClick = (
  el: React.MutableRefObject<null | any>,
  initialState: any
) => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const handleClickEvent = (e: MouseEvent) => {
      // If the active element exists and is clicked outside of
      if (el?.current !== null && !el?.current?.contains(e.target)) {
        setIsActive(!isActive);
      }
    };

    if (isActive) {
      window.addEventListener("mousedown", handleClickEvent);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickEvent);
    };
  }, [isActive, el]);

  return [isActive, setIsActive];
};
