import express from "express";
import { signin, singup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/singup", singup);

router.post("/signin", signin);

export default router;
