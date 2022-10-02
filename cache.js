export default class Cache {
  data = new Map()

  has(key) {
    return this.data.has(key)
  }

  get(key) {
    return this.data.get(key)
  }

  async getLazy(key, retreiveDataToCache) {
    if (!this.has(key)) {
      const dataToCache = await retreiveDataToCache()
      this.data.set(key, dataToCache)
    }

    return this.get(key)
  }

  set(key, value) {
    return this.data.set(key, value)
  }
}
