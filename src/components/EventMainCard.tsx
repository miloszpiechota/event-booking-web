import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import backgroundImage from "../assets/backgroundImage.jpg";
import Calendar from "../components/Calendar.tsx"; // Assuming you have this component

const EventMainCard: React.FC = () => {
  return (
    <div className="w-full flex justify-center py-10">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="w-full max-w-5xl"
      >
        {/* Slajd 1: EventMainCard */}
        <SwiperSlide>
          <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            {/* Tło z obrazkiem */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            >
              {/* Nakładka dla lepszego kontrastu */}
              <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {/* Półprzezroczysty kontener tekstowy */}
            <div className="absolute inset-y-0 left-0 w-2/5 bg-black/60 text-white p-6 flex flex-col justify-center backdrop-blur-md rounded-l-2xl">
              <h2 className="text-3xl font-extrabold">Tytuł wydarzenia</h2>
              <p className="text-lg mt-3">
                Tutaj znajduje się przykładowy opis, który można dostosować do własnych potrzeb. Sprawdź szczegóły i bądź na bieżąco!
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slajd 2: Calendar with Event Information */}
        <SwiperSlide>
          <div className="w-full h-auto bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <div className="flex justify-between space-x-8">
              

              {/* Calendar */}
              <div className="w-full max-w-4xl">
                
                <Calendar className="shadow-lg rounded-lg" />
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Additional slides can be added here */}
      </Swiper>
    </div>
  );
};

export default EventMainCard;
