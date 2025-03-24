import React, { useState } from "react";
import Header from "../components/Header.tsx";
import SearchBar from "../components/SearchBar.tsx";
import EventList from "../components/EventListV.tsx";
import backgroundImage from "../assets/background3.webp";
import MainCard from "../components/MainCard.tsx";
import EventList2 from "../components/EventListH.tsx";
import CategorySlider from "../components/CategorySlider.tsx";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <>
      <div className="relative bg-gray-100 dark:bg-gray-800">
        <div className="absolute top-0 left-0 w-full z-10">
          <Header />
        </div>

        <div
          className="relative h-[350px] bg-cover bg-center bg-no-repeat rounded-lg shadow-lg overflow-hidden"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>

          <div className="absolute bottom-0 left-0 p-8 z-20 flex justify-between items-center w-full">
            <div>
              <h1 className="text-3xl font-bold text-white">Welcome to Home Page</h1>
              <p className="text-gray-300 mt-4">
                This is a simple Single Page Application using React and Tailwind CSS.
              </p>
            </div>
            <div className="ml-8">
              <SearchBar onSearch={setSearchTerm} />
            </div>
          </div>
        </div>
      </div>

      <MainCard />
      <EventList2 />

      {/* Przekazujemy funkcję do ustawiania kategorii */}
      <CategorySlider onCategorySelect={setSelectedCategory} />

      <div className="mt-1">
        <EventList searchTerm={searchTerm} selectedCategory={selectedCategory} />
      </div>
    </>
  );
}

export default Home;
