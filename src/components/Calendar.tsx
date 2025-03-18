import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css"; // Importing styles for react-day-picker

const CalendarComponent: React.FC = () => {
  return (
    <div>
      <DayPicker
        className="shadow-lg rounded-lg bg-transparent"
       
      />
    </div>
  );
};

export default CalendarComponent;
