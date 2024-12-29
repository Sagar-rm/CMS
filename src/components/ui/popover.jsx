import React, { useState } from 'react';

const Popover = ({ trigger, content, className = '', ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative inline-block ${className}`} {...props}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div className="absolute z-10 w-64 p-4 mt-2 bg-white rounded-md shadow-lg dark:bg-gray-800">
          {content}
        </div>
      )}
    </div>
  );
};

const PopoverTrigger = ({ children }) => children;

const PopoverContent = ({ children }) => children;

export { Popover, PopoverTrigger, PopoverContent };