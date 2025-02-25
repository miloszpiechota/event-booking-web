import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-opacity-100 rounded-full px-4 py-2 shadow-md mt-5 backdrop-blur-sm border border-white w-100"
    >
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search..."
        className="bg-transparent text-white placeholder-white flex-grow focus:outline-none"
      />
      <button type="submit" className="ml-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="white"
          className="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
