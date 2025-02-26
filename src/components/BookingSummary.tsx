import React from 'react'

function BookingSummary() {
  return (
    <div className=" bg-white p-4 shadow rounded">
          <h2 className="text-xl font-semibold mb-4">Reservation Summary</h2>
          <p className="text-sm text-gray-600 mb-4">
            Podsumowanie wybranych opcji, dat, ceny itp.
          </p>
          {/* Przykładowe sekcje podsumowania */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Data przyjazdu:</span>
              <span className="font-semibold">22 May 2022</span>
            </div>
            <div className="flex justify-between">
              <span>Data wyjazdu:</span>
              <span className="font-semibold">25 May 2022</span>
            </div>
            <div className="flex justify-between">
              <span>Cena całkowita:</span>
              <span className="font-semibold">$788.87</span>
            </div>
          </div>
          {/* Możesz tu dodać przycisk "Download Invoice" lub inny */}
          <div className="mt-4">
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded">
              Download Invoice
            </button>
          </div>
        </div>
  )
}

export default BookingSummary
