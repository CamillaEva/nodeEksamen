import { Router } from "express";
import db from "../database/connection.js";


const router = Router();


router.post("/api/weight", async (req, res) => {

    const username = req.session.user?.username;

    console.log(username);
    if (!username) {
        return res.status(401).json({ error: "not logged in" });
    }

    const { newWeight } = req.body;
    const date = new Date().toISOString().split("T")[0]; // formats any date as YYYY-MM-DD

    console.log(newWeight);


    await db.run(`
        INSERT INTO weight_tables (username, new_weight, date_for_weight)
        VALUES (?, ?, ?);`,
        [username, newWeight, date]);

    res.send({ data: newWeight });
});



export default router;

