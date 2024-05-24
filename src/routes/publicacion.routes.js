import { Router } from "express";
import {
  createPublicacion,
  createNewPublicacion,
  verifyPublication,
  acceptedPublication,
  declinedPublication,
  renderPublications,
  deletePublication,
} from "../controllers/publicacionController.js";
const router = Router();

router.get("/createPublication", createPublicacion);
router.post("/createPublication/new", createNewPublicacion);
router.get("/verifyPublication", verifyPublication);
router.get("/accepted/:id", acceptedPublication);
router.get("/declined/:id", declinedPublication);
router.get("/renderPublications", renderPublications);
router.get("/deletePublication/:id", deletePublication);

export default router;
