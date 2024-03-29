import express from "express";
const router = express.Router();

import ProductAll from "../controllers/productAll";

router.get("/", ProductAll.GetList);

export default router;