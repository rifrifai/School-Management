import guru from "../../assets/svg/Student.svg";
import ExcelJs from "exceljs";
import CustomDropdown from "@/components/elements/DropDown";
import DropdownFilter from "@/components/elements/DropDownFilter";
import HeaderBox from "@/components/elements/data-guru/HeaderBox";
import { selectedDataDeleteMany } from "@/store/slices/admin-slice";
import { HOST } from "@/util/constant";
import { formatDate } from "@/util/formatDate";
import responseError from "@/util/services";
import axios from "axios";
import { FileDown, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TableGuru from "@/components/fragments/admin/data-guru.jsx/TableGuru";
import DeleteModal from "@/components/fragments/admin/data-guru.jsx/DeleteModal";
import DeleteManyModal from "@/components/fragments/admin/data-guru.jsx/DeleteManyModal";

const selectRow = [7, 14, 21, 28];

const DataGuruPage = () => {
  const dataChecked = useSelector(selectedDataDeleteMany);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dataGuru, setDataGuru] = useState([]);
  const [pagination, setPagination] = useState({});
  const [dataDetail, setDataDetail] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const [isDeleteGuru, setIsDeleteGuru] = useState(false);
  const [isDeleteManyGuru, setIsDeletManyGuru] = useState(false);
  const [allCheck, setAllCheck] = useState(false);
  const [filters, setFilters] = useState({
    kelas: "",
    kelasNama: "",
    jenisKelamin: "",
    bidangStudi: "",
  });
  const columns = useMemo(
    () => [
      {
        Header: "NIP",
        accessor: "nip",
      },
      {
        Header: "Nama",
        accessor: "nama",
      },
      {
        Header: "Jenis Kelamin",
        accessor: "jenisKelamin",
      },
      {
        Header: "Tempat Lahir",
        accessor: "tempatLahir",
      },

      {
        Header: "Tanggal Lahir",
        accessor: (row) => `${formatDate(row.tanggalLahir)}`,
      },
      {
        Header: "Bidang Studi",
        accessor: "bidangStudi",
      },
      {
        Header: "Alamat",
        accessor: "alamat",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Wali Kelas",
        accessor: (row) =>
          `${row.waliKelas ? row.waliKelas.kelas + row.waliKelas.nama : ""}`,
      },
    ],
    []
  );

  useEffect(() => {
    const getGuru = async () => {
      try {
        const res = await axios.get(`${HOST}/api/guru/get-all-guru`, {
          params: {
            page,
            limit,
            search,
            jenisKelamin: filters.jenisKelamin,
            kelasNama: filters.kelasNama,
            bidangStudi: filters.bidangStudi,
          },
          withCredentials: true,
        });
        if (res.status == 200) {
          setDataGuru(res.data.data);
          setPagination(res.data.pagination);
        }
      } catch (error) {
        responseError(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 50);
      }
    };
    const getDetail = async () => {
      try {
        const res = await axios.get(`${HOST}/api/guru/get-detail-guru`, {
          withCredentials: true,
        });
        if (res.status === 200) {
          setDataDetail(res.data.data);
        }
      } catch (error) {
        responseError(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 50);
      }
    };
    getGuru();
    getDetail();
  }, [limit, page, search, isDeleteGuru, isDeleteManyGuru, filters]);

  useEffect(() => {
    if (limit) {
      setPage(1);
    }
  }, [limit]);

  const handleToggleDeleteOne = () => {
    setIsDeleteGuru(!isDeleteGuru);
  };
  const handleToggleDeleteMany = () => {
    setIsDeletManyGuru(!isDeleteManyGuru);
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handlePagination = (page) => {
    setPage(page);
  };

  const handleSelectBaris = (option) => {
    setLimit(option);
  };

  const handleFilterChange = (filterName, filterValue) => {
    if (filterName === "kelas" && filterValue === "") {
      setFilters((prev) => ({ ...prev, kelasNama: "" }));
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: filterValue,
    }));
  };

  console.log(dataGuru);

  return (
    <section className="px-6 py-4 mb-4 ">
      <HeaderBox dataDetail={dataDetail} loading={loading} />
      <div className="w-full flex-between gap-6">
        <div className="relative flex w-full  md:max-w-[300px]">
          <input
            type="search"
            placeholder="Cari nama dan nip dari guru."
            value={search}
            disabled={loading}
            onChange={handleSearch}
            className="w-full rounded-full e disabled:cursor-not-allowed py-2 pr-2 pl-10 text-xs border border-gray-400 outline-offset-0 outline-1 outline-neutral"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Search height={20} width={20} className="text-gray-400" />
          </div>
        </div>

        <Link
          to={"/admin/tambah-guru"}
          disabled={loading}
          className="flex-between gap-3 min-w-fit bg-neutral hover:bg-indigo-800 transition-all duration-300 text-white py-2.5 text-xs px-4 rounded-md "
        >
          <img src={guru} alt="guru" width={15} height={15} />
          Tambah Guru
        </Link>
      </div>

      <div className="relative bg-white w-full  mt-6 border  overflow-hidden  rounded-lg">
        <div className="flex-between px-4 h-14 ">
          <div className="flex items-center gap-4  ">
            <button
              title="Hapus Guru terpilih"
              disabled={loading}
              onClick={handleToggleDeleteMany}
              className={`${
                dataChecked.length > 0 ? "opacity-100" : "opacity-0"
              } border block border-gray-300 bg-white text-gray-500 group rounded-md  hover:border-gray-400    py-1.5 px-2 transition-all duration-300 font-medium hover:text-white  text-xs   flex-between gap-3`}
            >
              <Trash2 width={15} height={15} className=" text-neutral2 " />
            </button>

            <CustomDropdown
              options={selectRow}
              onSelect={handleSelectBaris}
              selected={limit}
            />
            <DropdownFilter
              handleFilterChange={handleFilterChange}
              setFilters={setFilters}
            />
          </div>
          <div>
            <button
              title="Excel"
              disabled={loading}
              className="hover:bg-neutral transition-all disabled:cursor-not-allowed duration-300 group border p-1.5 rounded-md"
              onClick={() => exportToExcel(dataGuru)}
            >
              <FileDown
                width={20}
                height={20}
                strokeWidth={1}
                className="group-hover:text-white"
              />
            </button>
          </div>
        </div>
        {loading ? (
          <div className="block w-full shadow-md pb-[3.5rem]">
            <div className="w-full min-h-[455px] flex-center bg-backup animate-pulse overflow-auto ">
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent flex-center opacity-50 animate-shimmer"></div>
            </div>
          </div>
        ) : (
          <TableGuru
            data={dataGuru}
            page={page}
            limit={pagination.page}
            totalGuru={pagination.totalGuru}
            totalPage={pagination.totalPage}
            handlePagination={handlePagination}
            handleToggleDeleteOne={handleToggleDeleteOne}
            setAllCheck={setAllCheck}
            allCheck={allCheck}
            loading={loading}
          />
        )}
      </div>
      {isDeleteGuru && <DeleteModal onClose={handleToggleDeleteOne} />}
      {isDeleteManyGuru && (
        <DeleteManyModal
          onClose={handleToggleDeleteMany}
          setAllCheck={setAllCheck}
        />
      )}
    </section>
  );
};

const exportToExcel = async (data) => {
  const workbook = new ExcelJs.Workbook();
  const worksheet = workbook.addWorksheet(`Data Guru`);

  worksheet.mergeCells("A1:J1"); // Menggabungkan sel A1 hingga D1
  worksheet.getCell("A1").value = `Data Guru`; // Menambahkan judul
  worksheet.getCell("A1").font = { size: 16, bold: true };
  worksheet.getCell("A1").border = {
    top: { style: "thin", color: "FFFFFFFF" },
    left: { style: "thin", color: "FFFFFFFF" },
    bottom: { style: "thin", color: "FFFFFFFF" },
    right: { style: "thin", color: "FFFFFFFF" },
  }; // Mengatur gaya font
  worksheet.getCell("A1").alignment = {
    vertical: "middle",
    horizontal: "center",
  };

  worksheet.getRow(2).values = [
    "NIP",
    "Nama Guru",
    "Jenis Kelamin",
    "Tempat Lahir",
    "Tanggal Lahir",
    "Bidang Studi",
    "status",
    "Alamat",
    "Telepon",
    "Wali Kelas",
  ]; // Mengatur nilai header kolom
  worksheet.getRow(2).eachCell((cell, colNumber) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "362f7e" }, // Warna Biru
    };
    cell.font = { color: { argb: "FFFFFFFF" }, bold: true }; // Teks putih
    cell.alignment = { vertical: "middle", horizontal: "center" }; // Rata tengah
    cell.border = {
      top: { style: "thin", color: "FFFFFFFF" },
      left: { style: "thin", color: "FFFFFFFF" },
      bottom: { style: "thin", color: "FFFFFFFF" },
      right: { style: "thin", color: "FFFFFFFF" },
    };
    worksheet.getColumn(colNumber).width =
      colNumber === 1
        ? 20
        : colNumber === 2
        ? 30
        : colNumber === 6
        ? 25
        : colNumber === 8
        ? 30
        : colNumber === 3
        ? 15
        : 15;
  });

  data.forEach((Guru) => {
    const waliKelas = Guru.waliKelas
      ? `${Guru.waliKelas.kelas || ""} ${Guru.waliKelas.nama || ""}`
      : "";

    const rowValues = [
      Guru.nip,
      Guru.nama,
      Guru.jenisKelamin,
      Guru.tempatLahir,
      formatDate(Guru.tanggalLahir),
      Guru.bidangStudi.nama,
      Guru.status,
      Guru.alamat,
      Guru.phone,
      waliKelas,
    ];

    const row = worksheet.addRow(rowValues);

    // Menambahkan border pada setiap cell di body
    row.eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Menambahkan border pada setiap cell di body

    // Styling berdasarkan status untuk setiap cell
  });

  // Ekspor workbook ke Excel
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/octet-stream" });
  saveAs(blob, `Data Guru.xlsx`);
};

export default DataGuruPage;
