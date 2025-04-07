import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { formatPrice } from "../api/formatPrice.ts";
import { fetchEventByTicketId } from "../api/fetchEventByTicketId.ts";
import { formatLocalization } from "../api/formatLocalization.ts";
import { formatDateTime } from "../api/formatDateTime.ts";

function TicketCard({ order }: { order: any }) {
  const [eventData, setEventData] = useState<any>(null);

  useEffect(() => {
    const loadEventData = async () => {
      if (!order.order_ticket?.event_ticket?.id) return;
      const event = await fetchEventByTicketId(
        order.order_ticket.event_ticket.id
      );
      if (event) {
        setEventData(event);
      }
    };

    loadEventData();
  }, [order.order_ticket?.event_ticket?.id]);

  if (!order.order_ticket) {
    return <div>Order details not available</div>;
  }

  const [isReadMore, setIsReadMore] = useState(false);
  const toggleReadMore = () => setIsReadMore(!isReadMore);

  const { formattedStartDate, formattedEndDate } = formatDateTime(
    eventData?.start_date,
    eventData?.end_date
  );
  // Calculate extra ticket info
  const startDate = new Date(eventData?.start_date);
  const endDate = new Date(eventData?.end_date);
  const now = new Date();

  // DURATION (in hours and minutes)
  const durationMs = endDate.getTime() - startDate.getTime();
  const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
  const durationMinutes = Math.floor((durationMs / (1000 * 60)) % 60);

  // DAYS LEFT
  const daysLeft = Math.max(
    0,
    Math.ceil((startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  );

  // VALID UNTIL (reuse end date)
  const validUntil = formattedEndDate
    ? `${formattedEndDate.formattedDate} at ${formattedEndDate.formattedTime}`
    : "Not specified";

  // Używamy obrazka z eventData, jeśli jest, w przeciwnym razie fallback
  const imageUrl =
    eventData?.image_url ||
    "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600";

  return (
    <div className="flex flex-col items-center justify-center p-4  h-[400px]">
      <div className="max-w-3xl w-full border border-black rounded-lg flex flex-row overflow-hidden shadow-lg">
        {/* Left Side: Event Image with overlay details */}
        <div
          className="relative w-2/3 bg-cover bg-center "
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="relative z-10 p-6 flex flex-col justify-end h-full">
            <h2 className="text-3xl font-bold text-white mb-2">
              {order.order_ticket.event_ticket.name || "Event Name Unavailable"}
            </h2>
            <p className="text-sm text-gray-200">
              {eventData?.location
                ? formatLocalization(
                    eventData.location.street_name,
                    eventData.location.apartment_number,
                    eventData.location.city_name,
                    eventData.location.country_name
                  )
                : "Loading location..."}
            </p>
            <p className="text-sm text-gray-100 mt-4">
              {eventData?.short_description
                ? eventData.short_description.length > 100 && !isReadMore
                  ? `${eventData.short_description.slice(0, 100)}...`
                  : eventData.short_description
                : "Loading description..."}
            </p>
            {eventData?.short_description &&
              eventData.short_description.length > 100 && (
                <button
                  onClick={toggleReadMore}
                  className="mt-2 text-blue-300 text-xs font-semibold hover:underline self-start"
                >
                  {isReadMore ? "Read Less" : "Read More"}
                </button>
              )}
          </div>
        </div>

        {/* Right Side: Ticket Details & QR Code */}
        <div className="w-2/3 bg-black text-white p-6 flex flex-row justify-between items-start">
          {/* Ticket Details */}
          <div className="flex-1 pr-4">
            <div className="mb-3">
              <p className="text-xs uppercase text-gray-400">Start Date</p>
              <p className="text-lg font-bold">
                {formattedStartDate
                  ? `${formattedStartDate.formattedDate} at ${formattedStartDate.formattedTime}`
                  : "Loading..."}
              </p>
            </div>
            <div className="mb-3">
              <p className="text-xs uppercase text-gray-400">End Date</p>
              <p className="text-lg font-bold">
                {formattedEndDate
                  ? `${formattedEndDate.formattedDate} at ${formattedEndDate.formattedTime}`
                  : "Not specified"}
              </p>
            </div>

            <div className="mb-3">
              <p className="text-xs uppercase text-gray-400">Valid Until</p>
              <p className="text-lg font-bold">{validUntil}</p>
            </div>
            <div className="mb-3">
              <p className="text-xs uppercase text-gray-400">Duration</p>
              <p className="text-lg font-bold">
                {`${durationHours}h ${durationMinutes}m`}
              </p>
            </div>
            <div className="mb-3">
              <p className="text-xs uppercase text-gray-400">Days Left</p>
              <p className="text-lg font-bold">{daysLeft}</p>
            </div>

            <div className="mb-3">
              <p className="text-xs uppercase text-gray-400">Total Price</p>
              <p className="text-lg font-bold">
                {formatPrice(order.payment.total_price ?? 0)}
              </p>
            </div>
          </div>

         
          {/* QR Code */}
          <div className="flex-shrink-0 flex items-center justify-center ml-4 pl-4 border-l border-gray-600">
            {order.order_ticket.event_ticket.qr_code ? (
              <QRCode
                value={order.order_ticket.event_ticket.qr_code}
                size={100}
              />
            ) : (
              <div className="text-gray-400 text-xs">No QR Code</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketCard;
