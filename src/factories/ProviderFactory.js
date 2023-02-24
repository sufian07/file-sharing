const GoogleCloudStorageProvider = require("../providers/storeageProviders/GoogleCloudStorageProvider");
const LocalFileSystemProvider = require("../providers/storeageProviders/LocalFileSystemProvider");

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