import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, connection, disconnect } from 'mongoose';
import { Waybill } from '../models/waybill';
import { put } from '../storage/waybill-storage';
import { getStats } from './stats.service';

jest.setTimeout(600000);

describe('stats service tests', () => {

  let mongoServer;

  beforeAll(async () => {
    console.log('Downloading MongoDB binaries...');
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getConnectionString();
    console.log(mongoUri);
    await connect(mongoUri, { useNewUrlParser: true })
      .then(() => console.log('mongo connected'))
      .catch(error => console.error(error));
  });

  afterAll(async () => {
    await disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await connection.db.dropDatabase();
  });

  test('stats counts total waybill', async () => {
    await put(buildWaybill({ owner: 'me@test' }));
    await put(buildWaybill({ owner: 'me@test' }));
    await put(buildWaybill({ owner: 'me@test' }));

    const stats: StatsInfo = await getStats();

    expect(stats.waybillCount).toBe(3);
  });

  test('stats counts total owners', async () => {
    await put(buildWaybill({ owner: 'me@test' }));
    await put(buildWaybill({ owner: 'me2@test' }));
    await put(buildWaybill({ owner: 'me2@test' }));
    await put(buildWaybill({ owner: 'me@test' }));

    const stats: StatsInfo = await getStats();

    expect(stats.userCount).toBe(2);
  });

  test('stats counts total weight', async () => {
    await put(buildWaybill({ owner: 'me@test', orderInfo: { merchandise: { weight: '500' } } }));
    await put(buildWaybill({ owner: 'me2@test', orderInfo: { merchandise: { weight: '1000' } } }));
    await put(buildWaybill({ owner: 'me2@test', orderInfo: { merchandise: { weight: '1000' } } }));

    const stats: StatsInfo = await getStats();

    expect(stats.totalWeight).toBe(2500);
  });

  test(' stats as not field _id', async () => {
    await put(buildWaybill({ owner: 'me@test', orderInfo: { merchandise: { weight: '500' } } }));

    const stats: StatsInfo = await getStats();

    expect(stats).not.toHaveProperty('_id');
  });

});

const buildWaybill = (waybill) => Waybill.fromObj(waybill);
