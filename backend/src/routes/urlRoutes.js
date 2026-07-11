import express from "express";
import { shortenUrl,
        redirectUrl, 
        getAnalytics, 
      } from "../controllers/urlController.js";


const router = express.Router();

router.post("/shorten", shortenUrl);

router.get("/analytics/:shortCode", getAnalytics);

router.get("/:shortCode", redirectUrl);

export default router;