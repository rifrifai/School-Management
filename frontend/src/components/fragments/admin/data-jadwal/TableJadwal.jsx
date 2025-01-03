import React from "react";
import {
  setDataDelete,
  setDataDeleteMany,
  setDataEdit,
} from "@/store/slices/admin-slice";
import { ChevronLeft, ChevronRight, Edit, Trash, Trash2 } from "lucide-react";
import { space } from "postcss/lib/list";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Checkbox } from "@/components/ui/checkbox";
import jadwal from "../../../../assets/jadwal.png";

const waktuPelajaran = [
  { no: 1, jamKe: 1, waktu: "07.30 – 08.15" },
  { no: 2, jamKe: 2, waktu: "08.15 – 08.50" },
  { no: 3, jamKe: 3, waktu: "08.50 – 09.25" },
  { no: 4, jamKe: 4, waktu: "09.25 – 10.10" },
  { no: 5, jamKe: "Istirahat", waktu: "10.10 – 10.25" },
  { no: 6, jamKe: 5, waktu: "10.25 – 11.00" },
  { no: 7, jamKe: 6, waktu: "11.00 – 11.35" },
  { no: 8, jamKe: "Ishoma", waktu: "11.35 – 12.35" },
  { no: 9, jamKe: 7, waktu: "12.35 – 13.10" },
  { no: 10, jamKe: 8, waktu: "13.10 – 13.45" },
  { no: 11, jamKe: 9, waktu: "13.45 – 14.20" },
];

const TableJadwal = ({
  data,
  handleToggleDelete,
  handleToggleEdit,
  loading,
  allCheck,
  setAllCheck,
}) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;
  const [dataChecked, setDataChecked] = useState([]);
  const lastIndexjadwal = perPage * currentPage;
  const firstIndexjadwal = lastIndexjadwal - perPage;

  const dataSlice = data?.slice(firstIndexjadwal, lastIndexjadwal);

  const handleDeletejadwal = (jadwal) => {
    dispatch(setDataDelete(jadwal));
    handleToggleDelete();
  };

  const handleEditjadwal = (jadwal) => {
    dispatch(setDataEdit(jadwal));
    handleToggleEdit();
  };

  const handlePaginate = (index) => setCurrentPage(index);

  useEffect(() => {
    if (currentPage > 1 && dataSlice.length === 0) {
      setCurrentPage(currentPage - 1);
    }
  }, [dataSlice]);

  const handleCheckboxChange = (checked, jadwal) => {
    if (checked) {
      setDataChecked((prev) => [...prev, jadwal._id]);
      dispatch(setDataDeleteMany([...dataChecked, jadwal._id]));
    } else {
      setDataChecked((prev) => prev.filter((id) => id !== jadwal._id));
      dispatch(
        setDataDeleteMany(dataChecked.filter((id) => id !== jadwal._id))
      );
    }
  };

  const handleCheckboxAll = (checked) => {
    setAllCheck(!allCheck);

    if (checked) {
      setDataChecked(dataSlice.map((jadwal) => jadwal._id));
      dispatch(setDataDeleteMany(dataSlice.map((jadwal) => jadwal._id)));
    } else {
      setDataChecked([]);
      dispatch(setDataDeleteMany([]));
    }
  };

  return (
    <>
      <div className="block w-full relative  shadow-md pb-[3.5rem]">
        <div className="w-full  min-h-[340px] overflow-x-auto ">
          <table className=" w-full text-gray-500 table-a">
            <thead className="text-xs uppercase text-white bg-neutral">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-4 flex items-center justify-center"
                >
                  <Checkbox
                    type="checkbox"
                    checked={allCheck}
                    onCheckedChange={handleCheckboxAll}
                    className={
                      "min-h-4 min-w-3 border-white data-[state=checked]:bg-gray-800"
                    }
                  />
                </th>
                <th
                  scope="col"
                  className="px-10 text-left py-4 whitespace-nowrap"
                >
                  Bidang Studi
                </th>
                <th scope="col" className="px-10 text-left py-4">
                  Guru
                </th>
                <th scope="col" className="px-4 text-left py-4">
                  kelas
                </th>
                <th scope="col" className="px-1 py-4 whitespace-nowrap">
                  Jumlah pertemuan
                </th>
                <th scope="col" className="px-1  py-4">
                  Hari
                </th>
                <th scope="col" className="px-5 py-4">
                  waktu
                </th>

                <th className="sr-only"></th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr className="w-full h-full">
                  <td
                    colSpan="7"
                    className="px-2 py-4  border-gray-300 text-xs text-gray800 whitespace-nowrap h-[300px]"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <span className="w-8 h-8 block mb-2 animate-spin rounded-full border-4 border-t-gray-800 border-gray-300"></span>
                      <span>Loading</span>
                    </div>
                  </td>
                </tr>
              )}
              {dataSlice && !loading && dataSlice.length === 0 && (
                <tr className="w-full h-full">
                  <td
                    colSpan="7"
                    className="px-2 py-4  border-gray-300 text-xs text-gray-900 whitespace-nowrap h-[280px]"
                  >
                    <p className="text-center">Tidak ada data.</p>
                  </td>
                </tr>
              )}
              {dataSlice &&
                !loading &&
                dataSlice.map((jadwal, i) => (
                  <tr
                    key={jadwal._id}
                    className={`${
                      lastIndexjadwal === i + 1 && "border-none"
                    } hover:bg-gray-100 border-b  `}
                  >
                    <td scope="row" className="px-3 py-3 relative">
                      <Checkbox
                        type="checkbox"
                        name=""
                        checked={dataChecked.some(
                          (check) => check === jadwal._id
                        )}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(checked, jadwal)
                        }
                        id=""
                        className={
                          "w-4 h-4 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2  data-[state=checked]:bg-gray-800"
                        }
                      />
                    </td>
                    <td
                      scope="row"
                      className="px-10   border-gray-300  py-4 text-xs text-gray-900 truncate "
                    >
                      {jadwal.bidangStudi.kode} {jadwal.bidangStudi.nama}
                    </td>
                    <td
                      scope="row"
                      className="px-10    border-gray-300  py-4 text-xs text-gray-900 whitespace-nowrap "
                    >
                      {jadwal.guru.nama}
                    </td>
                    <td
                      scope="row"
                      className="px-4    border-gray-300  py-4 text-xs text-gray-900 whitespace-nowrap "
                    >
                      {jadwal.kelas.kelas} {jadwal.kelas.nama}
                    </td>
                    <td
                      scope="row"
                      className="px-2  text-center   border-gray-300  py-4 text-xs text-gray-900 whitespace-nowrap "
                    >
                      {jadwal.jumlahPertemuan}
                    </td>
                    <td
                      scope="row"
                      className="px-10 text-center  border-gray-300  py-4 text-xs text-gray-900 whitespace-nowrap "
                    >
                      {jadwal.hari}
                    </td>
                    <td
                      scope="row"
                      className="px-10  text-center  border-gray-300  py-4 text-xs text-gray-900 whitespace-nowrap "
                    >
                      {jadwal.mulai} - {jadwal.selesai}
                    </td>
                    <td
                      scope="row"
                      className="px-4    border-gray-300  py-4 text-xs text-gray-900 whitespace-nowrap "
                    >
                      <div className="flex-center gap-4">
                        <button
                          title="Edit"
                          onClick={() => handleEditjadwal(jadwal)}
                          className="w-[25px] h-[25px] border-2 rounded-md  border-gray-300 group hover:border-neutral1 flex-center transition-all duration-300"
                        >
                          <Edit
                            width={15}
                            strokeWidth={1}
                            height={15}
                            className="text-gray-800  group-hover:text-neutral1 transition-all duration-300"
                          />
                        </button>
                        <button
                          title="Hapus"
                          className="w-[25px] h-[25px] border-2 rounded-md  border-gray-300 group hover:border-neutral2 flex-center transition-all duration-300"
                          onClick={() => handleDeletejadwal(jadwal)}
                        >
                          <Trash
                            width={15}
                            strokeWidth={1}
                            height={15}
                            className="text-gray-800 group-hover:text-neutral2  transition-all duration-300"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <Pagination
          totaljadwal={data.length}
          perPage={perPage}
          currentPage={currentPage}
          firstIndexjadwal={firstIndexjadwal}
          lastIndexjadwal={lastIndexjadwal}
          paginate={handlePaginate}
          loading={loading}
          dataSlice={dataSlice}
        />
      </div>
      {/* <table className=" w-[40%] text-gray-500 table-a my-4 mx-auto">
        <thead className="text-xs uppercase text-white bg-neutral">
          <tr>
            <th className="px-3 py-4 flex items-center justify-center">No.</th>
            <th>Jam Ke - </th>
            <th>Waktu</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-10   border-gray-300  py-4 text-md text-gray-900 h-2">
              1.
            </td>
            <td className="px-10   border-gray-300  py-4 text-md text-gray-900 h-2">
              1
            </td>
            <td className="px-10   border-gray-300  py-4 text-md text-gray-900 h-2">
              07.30 – 08.15
            </td>
          </tr>
        </tbody>
      </table> */}
      {/* <img src={jadwal} alt="Jadwal" /> */}
      <div className="w-full flex-center">
        <img src={jadwal} alt="waktu pelajaran" className="h-[320px] p-4" />
      </div>
    </>
  );
};

const Pagination = ({
  loading,
  totaljadwal,
  perPage,
  currentPage,
  firstIndexjadwal,
  lastIndexjadwal,
  paginate,
  dataSlice,
}) => {
  const pageNumber = [];

  const totalPage = Math.ceil(totaljadwal / perPage);

  for (let i = 1; i <= totalPage; i++) {
    pageNumber.push(i);
  }

  const startPage =
    currentPage === totalPage
      ? Math.max(1, currentPage - 2)
      : Math.max(1, currentPage - 1);
  const endPage =
    currentPage === 1
      ? Math.min(totalPage, currentPage + 2)
      : Math.min(totalPage, currentPage + 1);

  const visiblePage = pageNumber.slice(startPage - 1, endPage);

  return (
    <div className=" absolute h-9 left-0 bottom-5 border-t pt-4 w-full flex-between px-3">
      {!loading && (
        <>
          <div className="h-6 flex-center">
            <p className="text-xs">{`Menampilkan ${
              dataSlice.length === 0 ? 0 : firstIndexjadwal + 1
            } - ${
              firstIndexjadwal + dataSlice.length
            } dari ${totaljadwal} Data`}</p>
          </div>
          {pageNumber.length !== 0 && (
            <div className="flex gap-2 ">
              <button
                onClick={() => paginate(currentPage - 1)}
                className="disabled:cursor-auto bg-neutral text-white rounded-sm disabled:bg-backup"
                disabled={currentPage === 1}
              >
                <ChevronLeft width={20} height={20} />
              </button>

              {visiblePage.map((number) => (
                <div key={number}>
                  <button
                    onClick={() => paginate(number)}
                    className={`${
                      number === currentPage &&
                      "rounded-full border-b  shadow border-gray-400"
                    } w-5 text-sm h-5`}
                  >
                    {number}
                  </button>
                </div>
              ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                className="disabled:cursor-auto bg-neutral text-white rounded-sm disabled:bg-backup"
                disabled={currentPage === pageNumber.length}
              >
                <ChevronRight width={20} height={20} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TableJadwal;
