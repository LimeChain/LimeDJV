import React from "react";

const Button = ({
  label,
  onClick,
  disabled = false,
  size = "default",
  className,
  color = "default",
}) => {
  let buttonSize = "default";
  if (buttonSize == "sm") {
    buttonSize == "sm";
  }
  return (
    <>
      <button
        className={disabled ? `disabled ${className}` : `${className}`}
        onClick={onClick}
      >
        {label}
      </button>
      <style jsx>{`
       
      `}</style>
    </>
  );
};

export default Button;
