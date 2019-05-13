import { Router } from 'express';
import { getStats } from '../service/stats.service';

const statsRoute = Router();

statsRoute.get('/', async (req, res) => {
  try {
    const stats = await getStats();

    res.json(stats);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

export { statsRoute };
