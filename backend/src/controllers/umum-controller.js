import Umum from "../models/umum-model.js";
import TahunAjaran from "../models/tahunAjaran-model.js";
import Siswa from "../models/siswa-model.js";
import Kelas from "../models/kelas-model.js";
import Guru from "../models/guru-model.js";
import Mapel from "../models/mapel-model.js";
import Total from "../models/total-model.js";
import { color, getColor } from "../data/color.js";

export const getUmum = async (req, res, next) => {
  try {
    const totalSiswa = await Siswa.countDocuments();

    const totalGuru = await Guru.countDocuments();
    const totalKelas = await Kelas.countDocuments();
    const totalMapel = await Mapel.countDocuments();
    const siswaPerAjaran = await Total.aggregate([
      {
        $addFields: {
          startYear: {
            $toInt: { $arrayElemAt: [{ $split: ["$ajaran", "/"] }, 0] },
          },
        },
      },
      {
        $sort: { startYear: 1 },
      },
      {
        $project: {
          ajaran: 1,
          totalSiswa: 1,
        },
      },
    ]);
    const kelasPerTotal = await Kelas.aggregate([
      {
        $group: {
          _id: "$kelas",
          totalKelas: { $sum: 1 },
        },
      },
      {
        $addFields: {
          colorIndex: { $mod: [{ $toInt: "$_id" }, color.length] },
        },
      },
      {
        $addFields: {
          fill: { $arrayElemAt: [color, "$colorIndex"] },
        },
      },
      {
        $project: {
          _id: 0,
          kelas: { $concat: ["kelas ", { $toString: "$_id" }] },
          totalKelas: 1,
          fill: 1,
        },
      },
      {
        $sort: { kelas: 1 },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil data Umum.",
      data: {
        totalSiswa,
        totalGuru,
        totalKelas,
        totalMapel,
        siswaPerAjaran,
        kelasPerTotal,
      },
    });
  } catch (error) {
    next(error);
  }
};