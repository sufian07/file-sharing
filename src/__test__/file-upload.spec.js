require('dotenv').config();
const request = require('supertest');
const path = require('path');
const app = require('../app');
const { setUpDatabase } = require('../db');

describe('File controller integration tests', () => {
  beforeAll(async ()=>{
    setUpDatabase();
  });
  afterAll(async () => {
    // server?.close();
  });
  const file = {
    name: 'test.txt',
    path: path.resolve(__dirname, './test.txt'),
  };
  let publicKey;
  let privateKey;

  describe('POST /files', () => {
    it('should upload a file and return public and private keys', async () => {
      const res = await request(app)
        .post('/files')
        .attach('file', file.path)
        .expect(201);

      expect(res.body).toHaveProperty('publicKey');
      expect(res.body).toHaveProperty('privateKey');
      publicKey = res.body.publicKey;
      privateKey = res.body.privateKey;
    });

    it('should return 400 if no file is attached', async () => {
        await request(app)
        .post('/files')
        .expect(400);
    });
  });
});