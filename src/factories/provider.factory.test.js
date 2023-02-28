const ProviderFactory = require('./provider.factory');
const GoogleCloudStorageProvider = require("../providers/storeage-providers/google-cloud-storage.provider");
const LocalFileSystemProvider = require("../providers/storeage-providers/local-file-system.provider");

describe('Providerf factory', ()=>{
  it('return provider correctly', ()=>{
    const localProvider = ProviderFactory.createProvider('local', {});
    expect(localProvider).toStrictEqual(expect.any(LocalFileSystemProvider))
    const localProvider2 = ProviderFactory.createProvider('', {});
    expect(localProvider2).toStrictEqual(expect.any(LocalFileSystemProvider))
    const googleProvider = ProviderFactory.createProvider('google', {});
    expect(googleProvider).toStrictEqual(expect.any(GoogleCloudStorageProvider))
  })
});