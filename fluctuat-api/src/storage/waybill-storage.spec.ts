import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, connection, disconnect } from 'mongoose';
import { Waybill } from '../models/waybill';
import { findByEmail, getAll, put } from './waybill-storage';

jest.setTimeout(600000);

describe('waybill storage tests', () => {

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

  test('waybills are sorted by order.sentAt', async () => {
    const date1st = new Date('2019-03-01');
    const date2nd = new Date('2019-02-01');
    const date3th = new Date('2019-01-10');

    // insert disordered
    await put(buildWaybill({ order: { sentAt: date1st } }));
    await put(buildWaybill({ order: { sentAt: date3th } }));
    await put(buildWaybill({ order: { sentAt: date2nd } }));

    const waybills = await getAll();

    expect(waybills.map(waybill => waybill.order.sentAt)).toEqual([date1st, date2nd, date3th]);
  });

  test('get my waybills are sorted by order.sentAt', async () => {
    const date1st = new Date('2019-03-01');
    const date2nd = new Date('2019-02-01');
    const date3th = new Date('2019-01-10');

    await put(buildWaybill({ owner: 'me@test', order: { sentAt: date1st } }));
    await put(buildWaybill({ owner: 'me@test', order: { sentAt: date3th } }));
    await put(buildWaybill({ owner: 'me@test', order: { sentAt: date2nd } }));
    await put(buildWaybill({})); // other waybill not my

    const waybills = await findByEmail('me@test');

    expect(waybills.map(waybill => waybill.order.sentAt)).toEqual([date1st, date2nd, date3th]);
    expect(waybills.filter(waybill => waybill.owner === 'me@test')).toHaveLength(3);
  });
});

const buildWaybill = (waybill) => Waybill.fromObj(waybill);
