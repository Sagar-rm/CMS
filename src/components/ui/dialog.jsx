// src/components/ui/dialog.jsx
import React, { useState } from 'react';

// Dialog container component
export const Dialog = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {React.Children.map(children, (child) => {
                // Pass isOpen and setIsOpen to child components if needed
                if (child.type === DialogTrigger) {
                    return React.cloneElement(child, { onClick: () => setIsOpen(true) });
                }
                if (child.type === DialogContent) {
                    return isOpen ? React.cloneElement(child, { onClose: () => setIsOpen(false) }) : null;
                }
                return child;
            })}
        </>
    );
};

// Trigger button to open the dialog
export const DialogTrigger = ({ onClick, children }) => (
    <button onClick={onClick} className="px-4 py-2 bg-blue-500 text-white rounded">
        {children}
    </button>
);

// Main dialog content wrapper
export const DialogContent = ({ onClose, children }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            {children}
            <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-300 rounded">
                Close
            </button>
        </div>
    </div>
);

// Header for the dialog content
export const DialogHeader = ({ children }) => (
    <div className="mb-4">
        {children}
    </div>
);

// Title inside the dialog header
export const DialogTitle = ({ children }) => (
    <h2 className="text-lg font-semibold mb-2">
        {children}
    </h2>
);

// Description inside the dialog content
export const DialogDescription = ({ children }) => (
    <p className="text-sm text-gray-700 mb-4">
        {children}
    </p>
);

