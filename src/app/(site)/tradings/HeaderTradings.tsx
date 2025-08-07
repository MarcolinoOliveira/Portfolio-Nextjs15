'use client'

const HeaderTradings = () => {
  return (
    <div className="grid grid-cols-7 md:grid-cols-18 gap-4 font-semibold py-3">
      <div className="flex col-span-3 md:col-span-6 lg:col-span-4 justify-start items-center">
        <p>Symbol/Name</p>
      </div>
      <div className="col-span-2 md:col-span-2 flex justify-center items-center">
        <p>Type</p>
      </div>
      <div className="hidden md:col-span-2 md:flex justify-center items-center">
        <p className="hidden lg:flex">Currency price</p>
        <p className="flex lg:hidden">Price</p>
      </div>
      <div className="md:col-span-2 flex justify-center items-center">
        <p className="hidden lg:flex">Invested value</p>
        <p className="flex lg:hidden">Value</p>
      </div>
      <div className="hidden md:col-span-2 md:flex justify-center items-center">
        <p>Cryptos</p>
      </div>
      <div className="hidden lg:flex lg:col-span-3 justify-center items-center">
        <p>Profit</p>
      </div>
      <div className="hidden md:col-span-3 lg:col-span-2 md:flex justify-center items-center">
        <p>Date</p>
      </div>
      <div className="flex justify-center items-center">

      </div>
    </div>
  );
}

export default HeaderTradings;