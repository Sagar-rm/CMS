import React, { useState } from 'react';

const Command = ({ children }) => {
  return <div className="relative">{children}</div>;
};

const CommandInput = ({ placeholder = 'Type a command...', onChange }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
    />
  );
};

const CommandEmpty = ({ children }) => {
  return <div className="p-2 text-gray-500 dark:text-gray-400">{children}</div>;
};

const CommandGroup = ({ children, heading }) => {
  return (
    <div>
      {heading && <div className="p-2 font-bold">{heading}</div>}
      {children}
    </div>
  );
};

const CommandItem = ({ children, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
    >
      {children}
    </div>
  );
};

export { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem };