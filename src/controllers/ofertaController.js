import app from "../app.js";
import { pool } from "../db.js";

export const makeOffer = async (req, res) => {
    const { id } = req.params;

    res.render("makeOffer", { id });
};

export const makeNewOffer = async (req, res) => {
    const idP = req.body.idPublication;
    const description = req.body.description;
    await pool.query("INSERT INTO offer (email, idPublication, description) VALUES(?, ?, ?)", [app.locals.emailCookie, idP, description]);
    res.redirect("/renderPublications");
}