import { Router } from 'express';

const router = Router();


router.get('/api/dashboard', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).send({ error: 'Not authenticated' });
  }

  const username = req.session.user.username;


  res.send({
    user: req.session.user.username
  });
});



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