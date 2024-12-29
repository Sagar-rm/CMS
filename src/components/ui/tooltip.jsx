// components/ui/tooltip.jsx
import React, { createContext, useContext, useState } from "react";

// TooltipProvider: Provides context for the Tooltip system
const TooltipContext = createContext(undefined);

export const TooltipProvider = ({ children }) => {
  return (
    <TooltipContext.Provider value={{}}>
      {children}
    </TooltipContext.Provider>
  );
};

export const useTooltipContext = () => {
  const context = useContext(TooltipContext);
  if (!context) throw new Error("useTooltipContext must be used within TooltipProvider");
  return context;
};

// TooltipTrigger: The element that triggers the tooltip
export const TooltipTrigger = ({ children }) => {
  return <div className="tooltip-trigger">{children}</div>;
};

// TooltipContent: The content that appears when the tooltip is triggered
export const TooltipContent = ({ children }) => {
  return (
    <div className="tooltip-content bg-black text-white p-2 rounded-md shadow-lg opacity-0 transition-opacity duration-200">
      {children}
    </div>
  );
};

// Tooltip: Combines TooltipProvider, TooltipTrigger, and TooltipContent
export const Tooltip = ({ content, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <TooltipProvider>
      <div
        className="relative"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
      >
        <TooltipTrigger>{children}</TooltipTrigger>
        {visible && <TooltipContent>{content}</TooltipContent>}
      </div>
    </TooltipProvider>
  );
};
