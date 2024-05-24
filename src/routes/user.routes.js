import { Router } from "express";
import {
  renderHomePage,
  createUser,
  createNewUser,
  loginUser, 
  renderUsers,
  loginEnterUser,
  profilePage,
  editProfile,
  saveEditProfile,
  deleteUser,
  logoutUser,
  changePassword,
  changeNewPassword
} from "../controllers/userController.js";
const router = Router();

router.get("/", renderHomePage);
router.get("/add", createUser);
router.post("/add/new", createNewUser);
router.get("/login", loginUser);
router.post("/login/enter", loginEnterUser);
router.get("/renderUsers", renderUsers);
router.get("/profile", profilePage);
router.get("/editProfile", editProfile);
router.post("/saveEdit", saveEditProfile);
router.get("/deleteUser/:id", deleteUser);
router.get("/logout", logoutUser);
router.get("/changePassword", changePassword);
router.post("/changeNewPassword", changeNewPassword);

export default router;
