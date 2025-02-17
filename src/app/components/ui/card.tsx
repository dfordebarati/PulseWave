// components/ui/card.tsx

import React from "react";

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={`p-4 rounded-lg shadow-lg ${className}`}>{children}</div>;
};

export const CardHeader = ({ children }: { children: React.ReactNode }) => {
  return <div className="mb-4">{children}</div>;
};

export const CardTitle = ({ children }: { children: React.ReactNode }) => {
  return <h3 className="text-xl font-semibold text-white">{children}</h3>;
};

export const CardContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="text-sm text-gray-400">{children}</div>;
};
