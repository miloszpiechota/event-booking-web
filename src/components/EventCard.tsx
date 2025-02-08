import React from "react";

const EventCard = ({ title, date, location, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-80">
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      <p className="text-gray-600">{date} • {location}</p>
      <p className="text-gray-700 mt-2">{description}</p>
      <button className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
        Learn More
      </button>
    </div>
  );
};

export default EventCard;
