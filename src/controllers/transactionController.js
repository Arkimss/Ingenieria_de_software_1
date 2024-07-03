import app from "../app.js";
import { pool } from "../db.js";

export const renderofferstoverify = async (req, res) => {
  /* const [rows] = await pool.query("SELECT * FROM offertoverify WHERE deleted = ?", ["F"]); */
  // Solamente se renderean aquellas publicaciones que no son las del usuario logeado
  const [idPuerto] = await pool.query("SELECT user.idPuerto FROM user WHERE email = ?", [app.locals.emailCookie]);
  console.log("El puerto es: " + idPuerto[0]);
  let offers = [];
  if (idPuerto) {
    const [publications] = await pool.query("SELECT * FROM publication WHERE idPuerto = ?", [idPuerto[0]]);
    const idPublications = [];
    if (publications.length > 0) {
      publications.forEach(item => {
        /* console.log("id foreach: ", item.idPublication); */
        idPublications.push(item.idPublication);
      })
      offers = await pool.query("SELECT idOfferToVerify as idOffer, publication.plate, publication.idPuerto, publication.description as descripcionPublicacion, user.name, vehicle.matricula, vehicle.marca, vehicle.modelo,vehicle.año, vehicle.kilometros, vehicle.description as descripcionVehiculo FROM offertoverify INNER JOIN publication ON offertoverify.idPublication = publication.idPublication INNER JOIN user ON offertoverify.idUser = user.idUser INNER JOIN vehicle ON offertoverify.idVehicle = vehicle.idVehicle WHERE publication.idPublication IN ?", [[idPublications]]);
      offers = offers[0];
      console.log("offers ", offers);
    }
    res.render("offers", { offers: offers, transactions: true });
  }
};

export const acceptTransaction = async (req, res) => {
  const { id } = req.params;
  /*const [offer] = await pool.query("SELECT idUser, idPublication, idVehicle FROM offertoverify WHERE idOfferToVerify = ?", [id]);
  await pool.query("INSERT INTO offertoverify set ?", [offer[0]]);
  await pool.query("UPDATE publication SET deleted = ? WHERE idPublication = ?", ["T", offer[0].idPublication]); */
  await pool.query("DELETE FROM offertoverify WHERE idOfferToVerify = ?", [id]);
  await pool.query("INSERT INTO transactionsuccess (`idTransaction`) VALUES (NULL)");
  res.redirect("/renderofferstoverify");
};

export const denyTransaction = async (req, res) => {
  const { id } = req.params;
  const [offer] = await pool.query("SELECT idUser, idPublication, idVehicle FROM offertoverify WHERE idOfferToVerify = ?", [id]);
  await pool.query("UPDATE publication SET deleted = ? WHERE idPublication = ?", ["F", offer[0].idPublication]);
  await pool.query("DELETE FROM offertoverify WHERE idOfferToVerify = ?", [id]);
  res.redirect("/renderofferstoverify");
};