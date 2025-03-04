import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import EventCard2 from "../components/EventCard2.tsx";
import { useEvents } from "../../context/EventContext.tsx"; // Pobieramy eventy z kontekstu

const EventList2: React.FC = () => {
  const { events, loading } = useEvents(); // Pobranie eventów z kontekstu

  if (loading) {
    return <p className="text-center text-gray-500">Loading events...</p>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Upcoming Events
      </h2>

      <Swiper
        modules={[Navigation, Mousewheel, Keyboard]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        navigation
        mousewheel
        keyboard
        className="pb-6"
      >
        {events.map((event) => (
          <SwiperSlide key={event.id}>
            <EventCard2 event={event} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EventList2;
