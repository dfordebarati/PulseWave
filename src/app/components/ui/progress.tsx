import React from "react";

export const Progress = ({
  value,
  className,
  max = 100,
}: {
  value: number;
  className?: string;
  max?: number;
}) => {
  // Ensure value is within the valid range (0 - max)
  const normalizedValue = Math.min(Math.max(value, 0), max);
  const progressPercentage = (normalizedValue / max) * 100;

  return (
    <div className={`relative ${className}`}>
      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="bg-pink-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className="text-xs font-semibold text-white text-right mt-1">
        {progressPercentage.toFixed(0)}%
      </div>
    </div>
  );
};
