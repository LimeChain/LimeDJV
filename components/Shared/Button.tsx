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
        button {
          background: ${color == "default"
            ? "#00E0B8"
            : color == "purple"
            ? "#7F72A1"
            : color == "gray"
            ? "#CACACA" : color === 'transparent'
              ? "transparent"
              : "white"
            };
          border-radius: 50px;
          color: ${color === "transparent" ? "#00E0B8" : "white"};
          font-weight: bold;
          font-size: ${size == "default"
            ? "25px"
            : size == "sm"
            ? "16px"
            : "16px"};
          padding: ${size == "default"
            ? "14px 49px 14px 49px"
            : size == "sm"
            ? "10px 20px 10px 20px"
            : "10px 20px 10px 20px"};
          border: ${color === "transparent" ? "1px solid #00E0B8" : "none"};
          cursor: pointer;
        }
        button:hover {
          box-shadow: 0px 0px 10px 3px rgba(46, 219, 188, 0.25);
        }
        .disabled {
          background: #d1d5db;
          pointer-events: none;
          box-shadow: none;
        }
      `}</style>
    </>
  );
};

export default Button;
