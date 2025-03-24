import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MapSlide from "./MapSlide";
import CalendarSlide from "./CalendarSlide";

const MainCard: React.FC = () => {
  return (
    <div className="flex justify-center py-10 rounded-lg">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="w-full max-w-3xl"
      >
        <SwiperSlide>
          <MapSlide />
        </SwiperSlide>

        <SwiperSlide>
          <CalendarSlide />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MainCard;
