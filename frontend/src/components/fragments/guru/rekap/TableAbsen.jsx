import React, { useState } from "react";
import logo from "../../../../assets/SMPITNuris.png";

const formatTable = (status) => {
  switch (status) {
    case "hadir":
      return <p className="text-xs">H</p>;
    case "izin":
      return <p className="text-xs">I</p>;
    case "sakit":
      return <p className="text-xs">S</p>;
    case "alpha":
      return <p className="text-xs">A</p>;
    default:
      return <p className="text-xs">-</p>;
  }
};

const TableAbsen = ({
  countDay,
  rekapAbsen,
  isPrintModalOpen,
  kelas,
  month,
}) => {
  return (
    <>
      <div className="w-full min-h-[calc(80vh-160px)] overflow-auto ">
        <table className="w-full border border-collapse ">
          <thead className="uppercase text-xs bg-neutral text-white">
            <tr>
              <th
                scope="col"
                rowSpan={2}
                className="py-4 px-4 w-[30%] text-center  whitespace-nowrap"
              >
                Nama Siswa
              </th>
              <th
                scope="col"
                colSpan={countDay}
                className="py-2 w-[50%] text-center border"
              >
                Tanggal
              </th>
              <th scope="col" colSpan={4} className="w-[20%] px-2 text-center ">
                Total
              </th>
            </tr>
            <tr>
              {[...Array(countDay)].fill().map((_, i) => (
                <th key={i + 1} className="py-2 px-1 border w-6">
                  {i + 1}
                </th>
              ))}
              <th className="py-2 px-1 border w-6">H</th>
              <th className="py-2 px-1 border w-6">I</th>
              <th className="py-2 px-1 border w-6">S</th>
              <th className="py-2 px-1  border-t w-6">A</th>
            </tr>
          </thead>
          <tbody>
            {rekapAbsen.length === 0 && (
              <tr>
                <td
                  colSpan={`${countDay + 4}`}
                  className="px-2 py-4 border-gray-300 text-xs font-medium text-gray-900 h-[300px] whitespace-nowrap"
                >
                  <p className="flex-center w-full text-xs">
                    Kelas Tidak Memiliki Siswa.
                  </p>
                </td>
              </tr>
            )}
            {rekapAbsen.length > 0 &&
              rekapAbsen.map((siswa, i) => (
                <tr key={i} className="hover:bg-gray-100">
                  <td
                    scope="row"
                    className="px-4 py-2 border text-xs capitalize text-gray-800 font-medium"
                  >
                    {siswa.nama}
                  </td>
                  {siswa?.statusPerHari.map((stat, i) => (
                    <td
                      key={i}
                      scope="row"
                      className={`${stat === " " && " text-white"} ${
                        stat === "hadir" && "bg-green-400 text-white"
                      } ${stat === "izin" && "bg-blue-400 text-white"}  ${
                        stat === "sakit" && "bg-orange-400 text-white"
                      } ${
                        stat === "alpha" && "bg-red-400 text-white"
                      } border text-center`}
                    >
                      {formatTable(stat)}
                    </td>
                  ))}
                  <td
                    scope="row"
                    className="px-4 border text-xs capitalize text-gray-800 font-medium"
                  >
                    {siswa.totalHadir}
                  </td>
                  <td
                    scope="row"
                    className="px-4 border text-xs capitalize text-gray-800 font-medium"
                  >
                    {siswa.totalIzin}
                  </td>
                  <td
                    scope="row"
                    className="px-4 border text-xs capitalize text-gray-800 font-medium"
                  >
                    {siswa.totalSakit}
                  </td>
                  <td
                    scope="row"
                    className="px-4 border text-xs capitalize text-gray-800 font-medium"
                  >
                    {siswa.totalAlpha}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal Print */}
    </>
  );
};

export default TableAbsen;
