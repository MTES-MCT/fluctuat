import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, disconnect } from 'mongoose';
import { getAll } from './waybill-storage';

jest.setTimeout(600000);

describe('waybill storage tests', () => {

  let mongoServer;

  beforeAll(async () => {
    console.log('Downloading MongoDB binaries...');
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getConnectionString();
    console.log(mongoUri);
    await connect(mongoUri, {useNewUrlParser: true})
      .then(() => console.log('mongo connected'))
      .catch(error => console.error(error)) ;
  });

  afterAll(async () => {
    await disconnect();
    await mongoServer.stop();
  });

  test('get all waybills', async () => {

    const waybills = await getAll();

    expect(waybills).toHaveLength(0);
  });
});
