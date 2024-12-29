// src/components/ui/Switch.js
import React from 'react';

const Switch = ({ isOn, handleToggle }) => (
    <div
        onClick={handleToggle}
        className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
            isOn ? 'bg-blue-500' : ''
        }`}
    >
        <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
                isOn ? 'translate-x-5' : ''
            }`}
        ></div>
    </div>
);

export default Switch;
