import app from "../app.js";
import { pool } from "../db.js";

export const createPublicacion = async (req, res) => {
  if (app.locals.emailCookie !== "empty@gmail.com") {
    res.render("createPublication");
  }
};

export const createNewPublicacion = async (req, res) => {
  const newPublication = req.body;
  let [matricula] = await pool.query("SELECT * FROM publication WHERE plate = ?", [newPublication.plate]);
  if (matricula.length == 0) {
    let [matricula] = await pool.query("SELECT * FROM publicationtoverify WHERE plate = ?", [newPublication.plate]);
    if (matricula.length == 0) {
      const [rows] = await pool.query("SELECT * FROM user WHERE email = ?", [app.locals.emailCookie]);
      newPublication.idUser = rows[0].idUser;
      await pool.query("INSERT INTO publicationtoverify set ?", [newPublication]);
      res.redirect("/");
    } else {
      res.status(500).send("No se puede realizar la publicacion. Matricula ya existente en el sistema");
    }
  } else {
    res.status(500).send("No se puede realizar la publicacion. Matricula ya existente en el sistema");
  }
};

export const verifyPublication = async (req, res) => {
  if (app.locals.emailCookie !== "empty@gmail.com") {
    const [user] = await pool.query("SELECT * FROM user WHERE email = ?", [app.locals.emailCookie]);
    if (user[0].role === "admin") {
      /* const idPuerto = user[0].idPuerto; */
      const idPuerto = 1;
      const [rows] = await pool.query("SELECT * FROM publicationtoverify WHERE idPuerto = ?", [idPuerto]);
      res.render("renderpublicationtoverify", { publications: rows });
    }
  }
};


export const acceptedPublication = async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.query("SELECT * FROM publicationtoverify WHERE idPublicationToVerify = ?", [id]);
  delete rows[0].idPublicationToVerify;
  console.log(rows[0]);
  await pool.query("INSERT INTO publication set ?", [rows[0]]);
  await pool.query("DELETE FROM publicationtoverify WHERE idPublicationToVerify = ?", [id]);
  res.redirect("/verifyPublication");
};

export const declinedPublication = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM publicationtoverify WHERE idPublicationToVerify = ?", [id]);
  res.redirect("/verifyPublication");
};

export const renderPublications = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM publication");
  res.render("publicaciones", { publicaciones: rows });
};

export const deletePublication = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM publication WHERE idPublication = ?", [id]);
  res.redirect("/renderPublications");
};