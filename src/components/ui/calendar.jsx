import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';

export default function Calendar ({ selected, onSelect }){
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
      <div className="flex justify-between mb-4">
        <button onClick={prevMonth}>&lt;</button>
        <div>{format(currentMonth, 'MMMM yyyy')}</div>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div key={day} className="text-center font-bold">
            {day}
          </div>
        ))}
        {days.map((day) => (
          <button
            key={day.toString()}
            onClick={() => onSelect(day)}
            className={`p-2 text-center rounded-full ${
              isSameMonth(day, currentMonth)
                ? 'text-gray-900 dark:text-gray-100'
                : 'text-gray-400 dark:text-gray-600'
            } ${
              isSameDay(day, selected)
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {format(day, 'd')}
          </button>
        ))}
      </div>
    </div>
  );
};

