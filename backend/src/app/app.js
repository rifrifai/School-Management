import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware, notFound } from "../middlewares/error-middleware.js";
import authRouter from "../routes/auth-router.js";
import siswaRouter from "../routes/siswa-router.js";
import kelasRouter from "../routes/kelas-router.js";
import MapelRouter from "../routes/mapel-router.js";
import guruRouter from "../routes/guru-router.js";
import ajaranRouter from "../routes/tahunAjaran-router.js";
import absenRouter from "../routes/absen-router.js";
import liburRouter from "../routes/libur-router.js";
import masterRouter from "../routes/master-router.js";
import jadwalRouter from "../routes/jadwal-router.js";
import nilaiRouter from "../routes/nilai-router.js";
import nilaiPertemuanRouter from "../routes/nilaiPertemuan-router.js";

export const app = express();
dotenv.config();

// app.use(
//   cors({
//     origin: [process.env.ORIGIN],
//     methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
//     credentials: true,
//   })
// );

// Menggunakan CORS untuk mengizinkan akses dari domain tertentu (front-end)
app.use(
  cors({
    // Domain front-end yang diizinkan
    origin: "https://school-management-eight-iota.vercel.app",
    // Metode HTTP yang diizinkan
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    // Izinkan pengiriman cookie
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/siswa", siswaRouter);
app.use("/kelas", kelasRouter);
app.use("/mapel", MapelRouter);
app.use("/guru", guruRouter);
app.use("/ajaran", ajaranRouter);
app.use("/master", masterRouter);
app.use("/absen", absenRouter);
app.use("/libur", liburRouter);
app.use("/jadwal", jadwalRouter);
app.use("/nilai", nilaiRouter);
app.use("/nilaiPertemuan", nilaiPertemuanRouter);

app.use(errorMiddleware);
// app.use(notFound);
