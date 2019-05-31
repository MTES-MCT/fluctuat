import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, connection, disconnect } from 'mongoose';
import { Contacts } from '../models/contacts';
import { Person } from '../models/person';
import { Transporter } from '../models/transporter';
import { Waybill } from '../models/waybill';
import { findByEmail, findContacts, getAll, put } from './waybill-storage';

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
    await put(buildWaybill({ orderInfo: { sentAt: date1st } }));
    await put(buildWaybill({ orderInfo: { sentAt: date3th } }));
    await put(buildWaybill({ orderInfo: { sentAt: date2nd } }));

    const waybills = await getAll();

    expect(waybills.map(waybill => waybill.orderInfo.sentAt)).toEqual([date1st, date2nd, date3th]);
  });

  test('get my waybills are sorted by order.sentAt', async () => {
    const date1st = new Date('2019-03-01');
    const date2nd = new Date('2019-02-01');
    const date3th = new Date('2019-01-10');

    await put(buildWaybill({ owner: 'me@test', orderInfo: { sentAt: date1st } }));
    await put(buildWaybill({ owner: 'me@test', orderInfo: { sentAt: date3th } }));
    await put(buildWaybill({ owner: 'me@test', orderInfo: { sentAt: date2nd } }));
    await put(buildWaybill({})); // other waybill not my

    const waybills = await findByEmail('me@test');

    expect(waybills.map(waybill => waybill.orderInfo.sentAt)).toEqual([date1st, date2nd, date3th]);
    expect(waybills.filter(waybill => waybill.owner === 'me@test')).toHaveLength(3);
  });

  test('get my waybills should retrieve all waybills witch user participate in', async () => {
    const email = 'me@test';
    const person = new Person();
    person.email = email;
    const aDate = new Date();
    await put(buildWaybill({ owner: 'me@test', orderInfo: { sentAt: aDate } }));
    await put(buildWaybill({ owner: 'other@test', orderInfo: { customer: person, sentAt: aDate } }));
    await put(buildWaybill({ owner: 'other@test', orderInfo: { sender: person, sentAt: aDate } }));
    await put(buildWaybill({ owner: 'other@test', orderInfo: { receiver: person, sentAt: aDate } }));
    await put(buildWaybill({ owner: 'other@test', orderInfo: { middleman: person, sentAt: aDate } }));
    await put(buildWaybill({ owner: 'other@test', orderInfo: { transporter: person, sentAt: aDate } }));
    await put(buildWaybill({ owner: 'other@test', orderInfo: { originInfo: { email }, sentAt: aDate } }));
    await put(buildWaybill({ owner: 'other@test', orderInfo: { destinationInfo: { email }, sentAt: aDate } }));

    const waybills = await findByEmail('me@test');

    expect(waybills).toHaveLength(8);
  });

  test('findContacts in all waybills of owner', async () => {
    const customer = buildPerson({ name: 'customer', email: 'customer@email' });
    const sender = buildPerson({ name: 'sender', email: 'sender@email' });
    const receiver = buildPerson({ name: 'receiver', email: 'receiver@email' });
    const middleman = buildPerson({ name: 'middleman', email: 'middleman@email' });
    const transporter = buildTransporter({ name: 'transporter', email: 'transporter@email', cellphone: '000' });
    const ship = { name: 'ship', regNumber: 'reg' };
    const originInfo = { email: 'loadManager@email' };
    const destinationInfo = { email: 'unloadManager@email' };

    const waybill = buildWaybill({
      owner: 'me@test',
      orderInfo: { customer, sender, receiver, middleman, transporter, ship, originInfo, destinationInfo }
    });

    await put(waybill);

    const contacts: Contacts = await findContacts('me@test');

    expect(contacts.customerNames).toEqual([customer.name]);
    expect(contacts.customerEmails).toEqual([customer.email]);
    expect(contacts.senderNames).toEqual([sender.name]);
    expect(contacts.senderEmails).toEqual([sender.email]);
    expect(contacts.receiverNames).toEqual([receiver.name]);
    expect(contacts.receiverEmails).toEqual([receiver.email]);
    expect(contacts.middlemanNames).toEqual([middleman.name]);
    expect(contacts.middlemanEmails).toEqual([middleman.email]);
    expect(contacts.transporterNames).toEqual([transporter.name]);
    expect(contacts.transporterEmails).toEqual([transporter.email]);
    expect(contacts.transporterCellphones).toEqual([transporter.cellphone]);
    expect(contacts.shipNames).toEqual([ship.name]);
    expect(contacts.shipRegNumbers).toEqual([ship.regNumber]);
    expect(contacts.loadManagerEmails).toEqual([originInfo.email]);
    expect(contacts.unloadManagerEmails).toEqual([destinationInfo.email]);
    expect(contacts.customers).toEqual([customer]);
    expect(contacts.senders).toEqual([sender]);
    expect(contacts.receivers).toEqual([receiver]);
    expect(contacts.middlemen).toEqual([middleman]);
    expect(contacts.transporters).toEqual([transporter]);
    expect(contacts.ships).toEqual([ship]);
  });

  test('findContacts shoud return undefined if empty', async () => {
    const contacts = await findContacts('me@test');
    expect(contacts).toBeUndefined();
  });
});

const buildWaybill = (waybill) => Waybill.fromObj(waybill);
const buildPerson = (person) => Object.assign(new Person(), person);
const buildTransporter = (transporter) => Object.assign(new Transporter(), transporter);
