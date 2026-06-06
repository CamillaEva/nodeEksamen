import { Router } from 'express';
import db from '../database/connection.js';

const router = Router();

// ----- GET -----


router.get('/api/dashboard', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).send({ error: 'Not authenticated' });
  }

  const username = req.session.user.username;

  const result = await db.get(`
        SELECT * 
        FROM user_informations
        WHERE username = ?
    `, [username]);

  const result2 = await db.all(`
        SELECT * 
        FROM weight_tables
        WHERE username = ?
    `, [username]);

  const latestWeight = await db.get(`
        SELECT new_weight
        FROM weight_tables
        WHERE username = ?
        ORDER BY id DESC
        LIMIT 1`,
    [username]);

  let userInfo = null;

  if (result) {
    userInfo = result;

    if (latestWeight) {
      userInfo.currentWeight = latestWeight.new_weight;
    } else {
      userInfo.currentWeight = result.start_weight;
    }
  }

  res.send({
    user: username,
    userInfo: userInfo,
    weightInfo: result2
  });
});


// ----- POST -----

router.post('/api/startInfo', async (req, res) => {

  const {
    birthday, gender, height,
    activity_level, goal, start_weight,
    start_date, calorie_goal
  } = req.body;

  const username = req.session.user?.username;

  if (!username) {
    console.log("no username");
    return res.status(401).json({ error: 'not logged in' });
  }

  
  await db.run(`
      INSERT INTO user_informations
      (username, birthday, gender, height, activity_level, goal, start_weight, start_date, calorie_goal) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [username, birthday, gender, height, activity_level, goal, start_weight, start_date, calorie_goal]);

  return res.status(200).json({ success: true });

});


export default router; 