import React from "react";
import Header from "../components/Header.tsx";
import SearchBar from "../components/SearchBar.tsx";
import EventList from "../components/EventList.tsx";
import backgroundImage from "../assets/pexels-wendywei-1387174.jpg";
import EventMainCard from "../components/EventMainCard.tsx";
import EventList2 from "../components/EventList2.tsx";

function Home() {
  return (
    <>
      {/* Kontener zawierający obrazek i header */}
      <div className="relative">
        {/* Header pozycjonowany absolutnie na górze */}
        <div className="absolute top-0 left-0 w-full z-10">
          <Header />
        </div>

        {/* Kontener z tłem ustawionym na obrazek */}
        <div
          className="relative h-[300px] bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          {/* Delikatny gradientowy overlay zamiast czarnego */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>

          {/* Tekst wyświetlany w dolnym lewym rogu */}
          <div className="absolute bottom-0 left-0 p-8 z-20 flex justify-between items-center w-full">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Welcome to Home Page
              </h1>
              <p className="text-gray-300 mt-4">
                This is a simple Single Page Application using React and Tailwind CSS.
              </p>
            </div>
            <div className="ml-8">
              <SearchBar onSearch={undefined} />
            </div>
          </div>
        </div>
      </div>

      {/* Główna karta wydarzenia */}
      <EventMainCard />

      {/* Karuzela wydarzeń */}
      <EventList2 />

      {/* Lista wydarzeń */}
      <div className="mt-1">
        <EventList />
      </div>
    </>
  );
}

export default Home;
