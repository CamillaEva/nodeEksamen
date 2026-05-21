import { Router } from 'express';
import db from '../database/connection.js';

const router = Router();


/* router.get('/api/dashboard', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).send({ error: 'Not authenticated' });
  }

  const username = req.session.user.username;


  res.send({
    user: req.session.user.username
  });
});
 */

/* router.get('/api/dashboard', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).send({ error: 'Not authenticated' });
  }

  const username = req.session.user.username;

  const result = await db.all(`
    SELECT calorie_goal FROM user_informations
    WHERE username =?`,
    [username]);

  const calorieGoalList = result.map(function (row) {
    return row.calorie_goal;
  });

  res.send({
    user: req.session.user.username,
    dailyCalories: calorieGoalList
  });
});
 */


/* router.get('/api/dashboard', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).send({ error: 'Not authenticated' });
  }
  
  const username = req.session.user.username;

  const userInfoResult = await db.get(`
        SELECT * FROM user_informations
        WHERE username = ?
        `, [username]);

  

  res.send({
    user: req.session.user,
    userInfo: userInfoResult || null, 
  });
}); */


router.get('/api/dashboard', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).send({ error: 'Not authenticated' });
    }

    const username = req.session.user.username;

    const result = await db.get(`
        SELECT * 
        FROM user_informations
        WHERE username = ?`, 
        [username]);

    const result2 = await db.get(`
      SELECT * 
      FROM weight_tables
      WHERE username = ?`,
    [username]);

    //disse to skal slettes inden eksamen
    console.log(result);
    console.log(result2);

    res.send({
        user: username,
        userInfo: result,
        weightInfo: result2

    });

    
});



router.post('/api/startInfo', async (req, res) => {
  
})

/* 
// ----- GET -----

router.get("/", (req, res) => {
    res.send();
});



// ----- POST -----

router.post("/endpoint", (req, res) => {
    req.body.json;
});


// ----- PUT -----



// ----- DELETE -----
 

 */

export default router; 