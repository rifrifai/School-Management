import express from "express";

import verifyToken from "../middlewares/auth-middleware.js";
import {
  addNilai,
  deleteManyNilai,
  deleteOneNilai,
  getNilaiKelas,
  updateNilai,
} from "../controllers/nilai-controller.js";

const nilaiRouter = express.Router();

nilaiRouter.post("/add-nilai", verifyToken, addNilai);
nilaiRouter.get("/all-siswa/:walikelasId", verifyToken, getNilaiKelas);
nilaiRouter.delete("/delete-one-nilai/:id", verifyToken, deleteOneNilai);
nilaiRouter.delete("/delete-many-nilai", verifyToken, deleteManyNilai);
nilaiRouter.put("/update-nilai/:id", verifyToken, updateNilai);

export default nilaiRouter;