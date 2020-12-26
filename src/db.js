import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";
import Store from "./pages/Store";

PouchDB.plugin(PouchDBFind); // install the pouchdb-find plugin
// const localDB = new PouchDB("easystock_gmv");

export default class DB {
  constructor(name) {
    this.db = new PouchDB(name);
    this.remoteDB = undefined;

    // try to get remote database credentials from a file (use secret.js.template as an example)
    // user can alternatively enter this connection string in the app by clicking the settings gear icon
    try {
      let Credentials = require("./secret");
      if (Credentials.default.remote_url) {
        // this.db = new PouchDB(Credentials.default.remote_url);

        this.remoteDB = new PouchDB(Credentials.default.remote_url + name);
        this.db.sync(this.remoteDB);
      }
    } catch (ex) {
      console.log("secret.js file missing; disabling remote sync.");
    }
  }

  //#region
  getStores = async () => {
    let stores = [];

    // let allStores = await this.db.allDocs({
    //   startkey: "stores",
    //   include_docs: true,
    //   // endkey: store,
    // });

    await this.db.createIndex({
      index: { fields: ["store"] },
    });
    await this.db
      .find({
        selector: { type: "store" },
        // fields: ["_id", "name"],
        // sort: ["name"],
      })
      .then(function (result) {
        // console.log(result);
        stores = result.docs;
        // yo, a result
      })
      .catch(function (err) {
        console.log(err);
        // ouch, an error
      });
    // console.log(stores);
    if (!stores.lenght) {
      // await this.addStore("main").then((res) => {
      // this.getStores();
      // });
    }

    // allStores.rows.forEach((store) => {
    //   stores[store.id] = store.doc;
    // });

    return stores;
  };

  addStore = async (store) => {
    const res = await this.db.put({
      name: store,
      _id: `stores:${Date.now()}`,
      type: "store",
    });
    return res;
  };

  //#endregion

  getAllProducts = async (store = "main") => {
    // console.log(store);
    let allProducts = await this.db.allDocs({
      startkey: "products",
      include_docs: true,
      // endkey: store,
    });

    // let allProducts = await this.db.find({
    //   selector: { type: "product" },
    // });

    let products = {};

    allProducts.rows.forEach((row) => {
      console.log(row);
      if (row.doc.type === "product" && row.doc.store === store)
        products[row.id] = row.doc;
    });
    return products;
  };

  getAllDocs = async (store = "main") => {
    let allDocs = await this.db.allDocs({
      include_docs: true,
      // endkey: store,
    });

    // let allProducts = await this.db.find({
    //   selector: { type: "product" },
    // });
    // let stores = {};
    let sellers = {};
    let customers = {};
    let products = {};
    let purchase = {};
    let sales = {
      total: 0,
      paid: 0,
    };
    let items = [];
    let users = [];

    allDocs.rows.forEach((row) => {
      // console.log(row);
      if (row.doc.type === "seller") {
        sellers[row.id] = row.doc;
        return;
      }
      if (row.doc.type === "customer") {
        customers[row.id] = row.doc;
        return;
      }
      if (row.doc.type === "product" && row.doc.store === store) {
        products[row.id] = row.doc;
        return;
      }
      if (row.doc.type === "purchase") {
        purchase[row.id] = row.doc;
        return;
      }
      if (row.doc.type === "sale") {
        sales.total = row.doc.total;
        sales.paid = row.doc.paid;
        items = items.concat(Object.values(row.doc.items));
        return;
      }
      if (row.doc.type === "user") {
        users[row.id] = row.doc;
        return;
      }
    });
    sales.items = items;
    // console.log(items);
    return { products, sellers, customers, purchase, sales, users };
  };
  addCustomer = async (customer) => {
    // console.log(product);
    const res = await this.db.put({
      ...customer,
      _id: `customers:${Date.now()}`,
      type: "customer",
    });
    return res;
  };
  addSeller = async (seller) => {
    // console.log(product);
    const res = await this.db.put({
      ...seller,
      _id: `sellers:${Date.now()}`,
      type: "seller",
    });
    return res;
  };
  addProduct = async (product, store) => {
    // console.log(product);
    const res = await this.db.put({
      ...product,
      _id: `products:${Date.now()}`,
      store: store,
      type: "product",
    });
    return res;
  };

  updateProduct = async (product) => {
    this.db
      .get(product._id)
      .then((doc) => {
        doc.rate = product.rate;
        doc.price = product.price;
        doc.qty += product.qty;

        return this.db.put(doc);
      })
      .then((_) => {
        return this.db.get(product._id);
      })
      .then((doc) => {
        // console.log(doc);
        return doc;
      });
  };
  makePurchase = async (bill) => {
    let db = this.db;
    const { products, seller, total, paid, createdAt } = bill;
    let items = {};
    products.forEach((p, index) => {
      items = {
        ...items,
        [index]: { product: p.name, qty: p.qty, rate: p.rate },
      };
    });
    this.db
      .bulkDocs([
        {
          _id: "purchase:" + createdAt,
          seller: seller,
          total: total,
          paid: paid,
          createdAt: createdAt,
          type: "purchase",
          items: items,
        },
        {
          _id: "withdrawal:" + createdAt,
          type: "withdrawal",
          amount: total,
          createdAt: createdAt,
        },
      ])
      .then((res) => {
        console.log(res);
        products.forEach((p) => {
          // console.log(p);
          this.db
            .get(p._id)
            .then((doc) => {
              doc.qty = parseInt(doc.qty) + parseInt(p.qty);
              doc.price = p.price;
              doc.rate = p.rate;
              this.db.put(doc);
            })
            .then((res) => {
              // console.log(res);
            });
        });
      });
    await db
      .createIndex({
        index: { fields: ["type", "name"] },
      })
      .then((res) => {
        db.find({
          selector: { type: "seller", name: seller },
          // sort: ["createdAt"],
        }).then(function (result) {
          console.log(result);
          let doc = result.docs[0];
          doc.orders = parseInt(doc.orders) + parseInt(total);
          doc.paid = parseInt(doc.paid) + parseInt(paid);

          db.put(doc).then((res) => {
            console.log(res);
            // updated
          });

          // yo, a result
        });
      })
      .catch(function (err) {
        console.log(err);
        // ouch, an error
      });
    //  console.log(from);
  };

  makeSales = async (bill) => {
    let db = this.db;
    const { products, customer, total, paid, createdAt } = bill;
    let items = {};
    products.forEach((p, index) => {
      items = {
        ...items,
        [index]: { product: p.name, qty: p.qty, price: p.price },
      };
    });
    this.db
      .bulkDocs([
        {
          _id: "sales:" + createdAt,
          customer: customer,
          total: total,
          paid: paid,
          createdAt: createdAt,
          type: "sale",
          items: items,
        },
        {
          _id: "deposited:" + createdAt,
          type: "deposited",
          amount: total,
          createdAt: createdAt,
        },
      ])
      .then((res) => {
        // console.log(res);
        products.forEach((p) => {
          // console.log(p);
          this.db
            .get(p._id)
            .then((doc) => {
              doc.qty = parseInt(doc.qty) - parseInt(p.qty);
              this.db.put(doc);
            })
            .then((res) => {
              // console.log(res);
            });
        });
      })
      .then((res) => {
        db.createIndex({
          index: { fields: ["type", "name"] },
        })
          .then((res) => {
            db.find({
              selector: { type: "customer", name: customer },
              // sort: ["createdAt"],
            }).then(function (result) {
              console.log(result);
              let doc = result.docs[0];
              doc.orders = parseInt(doc.orders) + parseInt(total);
              doc.paid = parseInt(doc.paid) + parseInt(paid);

              db.put(doc).then((res) => {
                console.log(res);
                // updated
              });

              // yo, a result
            });
          })
          .catch(function (err) {
            console.log(err);
            // ouch, an error
          });
      });
  };
  getSalesByDate = async (from, to) => {
    let sales = {
      total: 0,
      paid: 0,
    };
    let items = [];

    await this.db.createIndex({
      index: { fields: ["type", "createdAt"] },
    });
    console.log(from);
    await this.db
      .find({
        selector: {
          type: "sale",
          createdAt: { $gte: from, $lte: to },
        },
        // fields: ["_id", "name"],
        // sort: ["createdAt"],
      })
      .then(function (result) {
        result.docs.forEach((s) => {
          sales.total = s.total;
          sales.paid = s.paid;
          items = items.concat(Object.values(s.items));
        });
        sales.items = items;

        // yo, a result
      })
      .catch(function (err) {
        console.log(err);
        // ouch, an error
      });
    // console.log(sales);

    return sales;
  };
  getCustomerOrders = async (customer, from, to) => {
    let orders = {
      total: 0,
      paid: 0,
    };
    let items = [];
    let selector = from
      ? {
          type: "sale",
          customer: customer,
          createdAt: { $gte: from, $lte: to },
        }
      : { type: "sale", customer: customer };
    await this.db.createIndex({
      index: { fields: ["type", "createdAt", "customer"] },
    });
    //  console.log(from);
    await this.db
      .find({
        selector: selector,
        // fields: ["_id", "name"],
        // sort: ["createdAt"],
      })
      .then(function (result) {
        result.docs.forEach((s) => {
          orders.total = s.total;
          orders.paid = s.paid;
          s.items[0].createdAt = s.createdAt;
          items = items.concat(Object.values(s.items));
          console.log(items);
        });

        orders.items = items;

        // yo, a result
      })
      .catch(function (err) {
        console.log(err);
        // ouch, an error
      });
    // console.log(sales);

    return orders;
  };
}