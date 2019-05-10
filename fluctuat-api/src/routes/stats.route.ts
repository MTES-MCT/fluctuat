import { Router } from 'express';

const statsRoute = Router();

statsRoute.get('/', (req, res) => {
  const stats: StatsInfo = {
    userCount: 4,
    waybillCount: 14,
    totalWeight: 13000
  };

  res.json(stats);
});

export { statsRoute };
