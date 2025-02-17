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
  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs font-semibold inline-block py-1 uppercase">{value}%</div>
      </div>
      <div className="w-full h-2 bg-gray-300 rounded-full">
        <div
          className="bg-pink-500 h-2 rounded-full"
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  );
};
