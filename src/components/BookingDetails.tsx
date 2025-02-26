import React from "react";
// Ikonka z biblioteki Heroicons (npm install @heroicons/react)


function BookingDetails() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {/* Nagłówek formularza */}
      <h2 className="text-2xl font-semibold mb-6">Enter your details</h2>

      {/* Formularz ułożony w siatkę (2 kolumny na >= md) */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* FIRST NAME */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">
            First Name
          </label>
          <input
            type="text"
            placeholder="Maciej"
            className="w-full border border-gray-300 rounded px-3 py-2 
                       focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          {/* Ikonka check (absolutnie pozycjonowana w prawym górnym rogu pola) */}
          {/* <CheckIcon className="h-5 w-5 text-green-500 absolute right-3 top-9" /> */}
        </div>

        {/* LAST NAME */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Kuropatwa"
            className="w-full border border-gray-300 rounded px-3 py-2 
                       focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          {/* <CheckIcon className="h-5 w-5 text-green-500 absolute right-3 top-9" /> */}
        </div>

        {/* EMAIL ADDRESS */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">
            Email Address
          </label>
          <input
            type="email"
            placeholder="[email protected]"
            className="w-full border border-gray-300 rounded px-3 py-2 
                       focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          {/* <CheckIcon className="h-5 w-5 text-green-500 absolute right-3 top-9" /> */}
        </div>

       {/* PHONE NUMBER z listą rozwijaną na numer kierunkowy */}
       <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">
            Phone Number
          </label>
          <div className="flex">
            {/* Lista rozwijana (kierunkowy) */}
            <select
              className="border border-gray-300 rounded-l px-3 py-2 
                         focus:outline-none focus:ring-1 focus:ring-green-500"
              defaultValue="+48"
            >
              <option value="+48">+48</option>
              <option value="+49">+49</option>
              <option value="+44">+44</option>
              <option value="+1">+1</option>
              {/* Dodaj inne kody wg potrzeb */}
            </select>

            {/* Właściwy numer telefonu */}
            <input
              type="tel"
              placeholder="567 890 123"
              className="w-full border border-gray-300 border-l-0 rounded-r px-3 py-2 
                         focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
          </div>
      </form>
    </div>
  );
}

export default BookingDetails;