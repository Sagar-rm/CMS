import React from 'react';

const Slider = ({ min = 0, max = 100, step = 1, value, onChange, className = '', ...props }) => {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 ${className}`}
      {...props}
    />
  );
};

export default Slider;