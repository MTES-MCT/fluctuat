import { connection } from 'mongoose';

const getStats = async (): Promise<StatsInfo> => {
  return await connection.db.collection('waybills').aggregate([
    {
      $group: {
        _id: { owner: '$owner' },
        totalWeight: { $sum: { $toInt: '$order.merchandise.weight' } },
        waybillCount: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: null,
        userCount: { $sum: 1 },
        waybillCount: { $sum: '$waybillCount' },
        totalWeight: { $sum: '$totalWeight' },
      },
    },
    { $project: { _id: 0 } }
  ])
    .next();
};

export { getStats };
