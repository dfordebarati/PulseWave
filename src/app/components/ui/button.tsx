import React from "react";

// Button component with customizable className and onClick handler
export const Button = ({
  children,
  className,
  onClick,
  type = "button", // Default type is 'button'
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-2 rounded-lg border font-semibold focus:outline-none transition-all ${className}`}
    >
      {children}
    </button>
  );
};
