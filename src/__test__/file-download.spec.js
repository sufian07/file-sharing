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

  describe('GET /files/:publicKey', () => {
    it('should download the file with the given public key', async () => {
      const fileResponse = await request(app)
      .post('/files')
      .attach('file', file.path)
      .expect(201);
      publicKey = fileResponse.body.publicKey;
      privateKey = fileResponse.body.privateKey;
      const res = await request(app)
        .get(`/files/${publicKey}`)
        .expect(200);

      expect(res.headers['content-type']).toBe('text/plain');
      expect(res.text).toBe('This file iis to test file upload');
    });

    it('should return 404 status if file not exist', async () => {
      const res = await request(app)
        .get('/files/non-existing-key')
        .expect(404);
    })
  });
});