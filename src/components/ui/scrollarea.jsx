// src/components/ui/ScrollArea.js
import React from 'react';

const ScrollArea = ({ children }) => (
    <div className="h-40 overflow-y-scroll border border-gray-300 rounded p-3">
        {children}
    </div>
);

export default ScrollArea;
