import { Router } from "express";
import {
    makeOffer,
    makeNewOffer
} from "../controllers/ofertaController.js";
const router = Router();

router.get("/makeOffer/:id", makeOffer);
router.post("/makeOffer/new", makeNewOffer);

export default router;
