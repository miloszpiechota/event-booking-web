import React from "react";
import Header from "../components/Header.tsx";
import SearchBar from "../components/SearchBar.tsx";
import EventList from "../components/EventList.tsx";
function Home() {
  return (
    <>
      <Header />
      {/* Kontener z tłem ustawionym na linear gradient z dominującą czernią */}
      <div className="relative h-[200px] bg-gradient-to-r from-black via-gray-800 to-black">
        {/* Tekst wyświetlany w dolnym lewym rogu */}
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="text-3xl font-bold text-white">
            Welcome to Home Page
          </h1>
          <p className="text-gray-300 mt-4">
            This is a simple Single Page Application using React and Tailwind CSS.
          </p>
          <SearchBar onSearch={undefined} />
        </div>
      </div>
      <EventList />
    </>
  );
}

export default Home;
