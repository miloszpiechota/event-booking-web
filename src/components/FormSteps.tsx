import React from 'react'

function FormSteps() {
  return (
    <div className="mb-8 flex items-center justify-around">
        {/* Możesz zastąpić poniższe divy mapowaniem po tablicy kroków, jeśli chcesz. */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white font-bold">
            1
          </div>
          <span className="font-semibold">Dates & Rooms</span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white font-bold">
            2
          </div>
          <span className="font-semibold">Extras</span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white font-bold">
            3
          </div>
          <span className="font-semibold">Payment</span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white font-bold">
            4
          </div>
          <span className="font-semibold">Confirmation</span>
        </div>
      </div>
  )
}

export default FormSteps
