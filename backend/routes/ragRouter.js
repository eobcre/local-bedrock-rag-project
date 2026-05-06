import { Router } from "express";
import { ragController } from "../controllers/ragController.js";

const router = Router();

router.post(
  "/rag",
  (req, res, next) => {
    next();
  },
  ragController,
);

export default router;
