import express from "express";

const router = express.Router();

router.post("/create_course", create_Course);

export default router;