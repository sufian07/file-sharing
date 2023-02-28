const GoogleCloudStorageProvider = require("../providers/storeage-providers/google-cloud-storage.provider");
const LocalFileSystemProvider = require("../providers/storeage-providers/local-file-system.provider");

class ProviderFactory {
  static createProvider(providerType, config) {
    switch(providerType) {
      case 'google':
        return new GoogleCloudStorageProvider(config);
      case 'local':
      default:
        return new LocalFileSystemProvider(config);
    }
  }
}
module.exports=ProviderFactory;