import { Router } from 'express';
import db from '../database/connection.js';
import { hashedPassword, comparePassword } from '../util/passwordHashing.js';
import { sendMail } from '../util/mailerTransporter.js';

const router = Router();

router.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  const result = await db.all(`
        SELECT * FROM users
        WHERE username = ?
        `, [username]);

  if (result.length > 0) {
    const user = result[0];

    const isSamePassword = await comparePassword(password, user.hashed_password);

    if (isSamePassword) {
      req.session.user = user;

      sendMail(user.email).catch(error =>
        console.log(error));

      res.send({ data: { username: user.username } });
    } else {
      res.status(401).send({ error: "couldn't find password or username" });
    }
  } else {
    res.status(401).send({ error: "couldn't find password or username" });
  }
});

router.post('/api/logout', (req, res) => {
  req.session.destroy((error) => {
    res.send({ data: 'you are now logged out' });
  });
});

router.get('/api/session', (req, res) => {
  if (req.session.user) {
    res.send({ data: req.session.user });
  } else {
    res.status(401).send({ error: 'you shall not PASS' });
  }
});


router.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {

    const doesUserExist = await db.all(`
      SELECT * FROM users
      WHERE username = ?
    `, [username]);

    if (doesUserExist.length > 0) {
      return res.status(409).send({
        error: 'username already exists'
      });
    }

    const hashedPassword = await hashedPassword(password);

    await db.run(`
      INSERT INTO users (username, hashed_password, email)
      VALUES (?, ?, ?)
    `, [username, hashedPassword, email]);

    res.status(201).send({
      data: 'user created'
    });

  } catch (error) {

    res.status(500).send({
      error: 'server error'
    });
  }
});


export default router;
