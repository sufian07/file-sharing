const request = require('supertest');
const path = require('path');
const {app, server} = require('../app');

describe('File controller integration tests', () => {
  afterAll(async () => {
    server?.close();
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
  });

  describe('GET /files/:publicKey', () => {
    it('should download the file with the given public key', async () => {
      const res = await request(app)
        .get(`/files/${publicKey}`)
        .expect(200);

      expect(res.headers['content-type']).toBe('text/plain');
      expect(res.text).toBe('This file iis to test file upload');
    });
  });

  describe('DELETE /files/:privateKey', () => {
    it('should delete the file with the given private key', async () => {
      const res = await request(app)
        .delete(`/files/${privateKey}`)
        .expect(200);

      expect(res.body).toEqual({ message: 'File deleted successfully.' });
    });
  });
});