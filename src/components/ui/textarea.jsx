// src/components/ui/Textarea.js
import React from 'react';

const Textarea = ({ placeholder, rows = 4, ...props }) => (
    <textarea
        rows={rows}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
    />
);

export default Textarea;
