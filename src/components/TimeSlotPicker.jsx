import React from "react";

const TimeSlotPicker = ({ timeSlots, selectedTime, onSelect }) => {
  return (
    <div className="grid grid-cols-3 gap-2 text-sm">
      {timeSlots.map((time) => (
        <button
          key={time}
          type="button"
          onClick={() => onSelect(time)}
          className={`px-3 py-2 rounded transition-colors duration-200 ${
            selectedTime === time
              ? "bg-[#cba670] text-white"
              : "bg-pink-100 hover:bg-pink-200 text-gray-800"
          }`}
        >
          {time}
        </button>
      ))}
    </div>
  );
};

export default TimeSlotPicker;
