import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {

  console.log(req.body);

  res.status(201).json(req.body);
});

module.exports = router;
