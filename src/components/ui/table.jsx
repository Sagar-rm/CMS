// src/components/ui/Table.jsx
import React from 'react';

// Main Table component
export const Table = ({ children, className = '' }) => (
  <table className={`min-w-full bg-white ${className}`}>{children}</table>
);

// Table Head
export const TableHead = ({ children, className = '' }) => (
  <thead className={`bg-gray-200 text-gray-600 uppercase text-sm leading-normal ${className}`}>
    {children}
  </thead>
);

// Table Header
export const TableHeader = ({ children, className = '' }) => (
  <th className={`py-3 px-6 text-left ${className}`}>{children}</th>
);

// Table Body
export const TableBody = ({ children, className = '' }) => (
  <tbody className={`text-gray-600 text-sm font-light ${className}`}>{children}</tbody>
);

// Table Row
export const TableRow = ({ children, className = '' }) => (
  <tr className={`border-b border-gray-200 hover:bg-gray-100 ${className}`}>{children}</tr>
);

// Table Cell
export const TableCell = ({ children, className = '' }) => (
  <td className={`py-3 px-6 ${className}`}>{children}</td>
);
