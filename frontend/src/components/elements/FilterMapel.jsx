import React, { forwardRef, useEffect, useRef } from "react";

const FilterMapel = forwardRef(
  ({ handleOptionChange, option, handleToggleFilter }, ref) => {
    return (
      <div
        ref={ref}
        className="w-[200px] border left-0 top-8 rounded-lg absolute  bg-white shadow-md z-10 flex flex-col flex-between py-3 items-stretch"
      >
        <h4 className="text-xs border-b mb-2 px-3 pb-3 font-medium text-gray-700">
          Urut Bedasarkan :
        </h4>
        <div className="px-3 space-y-2">
          <div className="flex-between ">
            <label htmlFor="terbaru" className="text-xs font-medium w-full">
              Terbaru
            </label>

            <input
              type="radio"
              value={"terbaru"}
              id="terbaru"
              onChange={handleOptionChange}
              checked={option === "terbaru"}
              className="w-4 h-4"
            />
          </div>
          <div className="flex-between ">
            <label htmlFor="terlama" className="text-xs font-medium w-full">
              Terlama
            </label>

            <input
              type="radio"
              value={"terlama"}
              id="terlama"
              onChange={handleOptionChange}
              checked={option === "terlama"}
              className="w-4 h-4"
            />
          </div>
          <div className="flex-between ">
            <label htmlFor="a-z" className="text-xs font-medium w-full">
              A-Z
            </label>

            <input
              type="radio"
              value={"a-z"}
              id="a-z"
              onChange={handleOptionChange}
              checked={option === "a-z"}
              className="w-4 h-4"
            />
          </div>
          <div className="flex-between ">
            <label htmlFor="z-a" className="text-xs font-medium w-full">
              Z-A
            </label>

            <input
              type="radio"
              value={"z-a"}
              id="z-a"
              onChange={handleOptionChange}
              checked={option === "z-a"}
              className="w-4 h-4"
            />
          </div>
        </div>
      </div>
    );
  }
);

FilterMapel.displayName = "filter";

export default FilterMapel;
