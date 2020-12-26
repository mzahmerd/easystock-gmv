export default class StoreRepository {
  getStores = async () => {
    let allStores = await this.db.allDocs({
      startkey: "stores",
      include_docs: true,
      // endkey: store,
    });

    let stores = {};

    allStores.rows.forEach((store) => {
      stores[store.id] = store.doc;
    });
    return stores;
  };

  addStore = async (store) => {
    const res = await this.db.put({
      ...store,
      _id: `stores:${Date.now()}`,
      type: "store",
    });
    return res;
  };
}
