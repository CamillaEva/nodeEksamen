import { Router } from 'express';
import db from '../database/connection.js';

const router = Router();


router.post('/api/calories', async (req, res) => {

    const username = req.session.user?.username;

    if (!username) {
        return res.status(401).json({ error: "not logged in" });
    }

    const { calories } = req.body;
    const date = new Date().toISOString().split("T")[0];

    const result = await db.run(`
        INSERT INTO calories_tables
        (username, date_for_calories, calories)
        VALUES (?, ?, ?);`,
        [username, date, calories]);

    res.send({ data: calories })
});


router.get('/api/calories', async (req, res) => {


    const username = req.session.user?.username;

    if (!username) {
        return res.status(401).json({ error: "not logged in" });
    }

    const date = new Date().toISOString().split("T")[0];


    const calorieList = await db.all(`
        SELECT * FROM calories_tables 
        WHERE username = ? 
        AND date_for_calories = ?
        `,
        [username, date]);


    const totalCaloriesForUser = await db.get(`
        SELECT SUM(calories) AS totalCalories
        FROM calories_tables
        WHERE username = ?
        AND date_for_calories = ?
        `,
        [username, date]);


    res.send({
        calorieList: calorieList,
        totalCalories: totalCaloriesForUser.totalCalories || 0
    });
});


export default router;