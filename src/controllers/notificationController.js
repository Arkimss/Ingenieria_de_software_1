import app from "../app.js";
import { pool } from "../db.js";


export const renderNotification = async (req, res) => {
    const [user] = await pool.query("SELECT idUser FROM user WHERE email = ?", [app.locals.emailCookie]);
    console.log(user[0].idUser);
    const [rows] = await pool.query("SELECT * FROM notification WHERE idUser = ?", [user[0].idUser]);
    res.render("renderNotifications", { notifications: rows });
};


export const deleteNotification = async (req, res) => {
    const { id } = req.params;
    const [notification] = await pool.query("SELECT idNotification FROM notification WHERE idNotification = ?", [id]);

    await pool.query("DELETE FROM notification WHERE  idNotification = ?", [id]);
    res.redirect("/renderNotification");
};


export const toggleLike = async (req, res) => {
    const { userId, publicationId } = req.body;
    const [favourite] = await pool.query("SELECT * FROM favouritePublication WHERE idPublication = ?", [publicationId]);
    if (favourite.length > 0) {
        await pool.query("DELETE FROM favouritePublication WHERE idPublication = ?", [publicationId]);
    }
    else {
        await pool.query(" INSERT INTO favouritePublication set idUser = ? , idPublication = ? ", [userId, publicationId]);
    }
    // await pool.query("DELETE FROM notification WHERE  idNotification = ?", [id]);
    // res.redirect("/renderNotification");
};
