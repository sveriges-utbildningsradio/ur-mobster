import storage from 'electron-json-storage'

const persistToStore = (key, values) => {
  storage.set(key, values, error => {
    if (error) throw error
  })
}

export default persistToStore
