require('dotenv').config()
const sanityClient =  require('@sanity/client')
const { Storage, StoreItems } = require('botbuilder')

class SanityStorageError extends Error {
  
}

class SanityStorage {
  constructor(config) {
    this.client = sanityClient({
      projectId: config.projectId,
      dataset: config.dataset,
      token: config.token,
      useCdn: config.useCdn
    })
    this.config = SanityStorage.ensureConfig(Object.assign({}, config))
  }
  static ensureConfig(config) {
    if (!config) {
      throw SanityStorageError.NO_CONFIG_ERROR
    }
    if (!config.projectId) {
      throw SanityStorageError.NO_PROJECTID_ERROR
    }
    if (!config.dataset) {
      throw SanityStorageError.NO_DATASET_ERROR
    }
    if (!config.token) {
      throw SanityStorageError.NO_TOKEN_ERROR
    }
    return config
  }
  async read(stateKeys) {
    if (!stateKeys || stateKeys.length === 0) {
      return {};
    }
    const docs = await this.client.fetch('*[_type == "team"]{_id}')
    console.log(docs)
    const storeItems = () => null
    return storeItems
  }
  async write(changes) {
    if (!changes || Object.keys(changes).length === 0) {
      return;
    }
    const operations = []
    Object.keys(changes).forEach(key => {
      const state = changes[key]
      const shouldSlam = SanityStorage.shouldSlam(state.eTag)
      const oldETag = state.eTag
      operations.push({
        set: {
          state
        }
      })
      
    })
    // something more
  }
  delete(keys) {
    if (!keys || keys.length == 0) {
      return;
    }
  }
  static shouldSlam(eTag) {
    return (eTag === '*' || !eTag);
  }
  static createFilter(key, eTag) {
    if(this.shouldSlam(eTag)) {
      return { _id: key }
    }
    return {_id: key, 'state.eTag': eTag}
  }
  get Collection() {
    return this.client.getDocument(this.config.collection)
  }
}

exports.SanityStorage = SanityStorage