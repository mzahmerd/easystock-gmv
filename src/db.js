import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";
// import Store from "./pages/Store";

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
        //   , {
        //   live: true,
        // })
        // .on("change", function (change) {
        //   // yo, something changed!
        // })
        // .on("error", function (err) {
        //   // yo, we got an error! (maybe the user went offline?)
        // });
      }
    } catch (ex) {
      console.log("secret.js file missing; disabling remote sync.");
    }
  }

  //#region
  getStores = async () => {
    let stores = [];

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
    // console.log(stores.length);
    if (!stores.length) {
      await this.addStore("main").then(async (res) => {
        // console.log(res);
        await this.getStores().then((s) => (stores = s));
      });
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

  getAllProducts = async (storename) => {
    // console.log(store);
    let allProducts = await this.db.allDocs({
      startkey: "products",
      include_docs: true,
      // endkey: store,
    });
    let store = {
      totalRate: 0,
      totalAmount: 0,
    };
    // let allProducts = await this.db.find({
    //   selector: { type: "product" },
    // });

    let products = {};

    allProducts.rows.forEach((row) => {
      // console.log(row);
      if (row.doc.type === "product" && row.doc.store === storename) {
        products[row.id] = row.doc;
        store.totalRate += row.doc.rate * row.doc.qty;
        store.totalAmount += row.doc.price * row.doc.qty;
      }
    });
    store.products = products;
    return store;
  };

  getAllDocs = async (storename) => {
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
    let store = {
      totalRate: 0,
      totalAmount: 0,
    };
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
      if (row.doc.type === "product" && row.doc.store === storename) {
        products[row.id] = row.doc;
        store.totalRate += row.doc.rate * row.doc.qty;
        store.totalAmount += row.doc.price * row.doc.qty;
        return;
      }
      if (row.doc.type === "purchase" && row.doc.store === storename) {
        purchase[row.id] = row.doc;
        return;
      }
      if (row.doc.type === "sale" && row.doc.store === storename) {
        sales.total += parseInt(row.doc.total);
        sales.paid += parseInt(row.doc.paid);
        items = items.concat(Object.values(row.doc.items));
        return;
      }
      if (row.doc.type === "user") {
        users[row.id] = row.doc;
        return;
      }
    });
    sales.items = items;
    store.products = products;
    // console.log(items);
    return { store, sellers, customers, purchase, sales, users };
  };
  addCustomer = async (customer) => {
    // console.log(product);
    const res = await this.db.put({
      ...customer,
      _id: `customers:${Date.now()}`,
      lastBalance: Date.now(),
      type: "customer",
    });
    return res;
  };
  addSeller = async (seller) => {
    // console.log(product);
    const res = await this.db.put({
      ...seller,
      _id: `sellers:${Date.now()}`,
      lastBalance: Date.now(),
      type: "seller",
    });
    return res;
  };
  addUser = async (user) => {
    // console.log(product);
    const res = await this.db.put({
      ...user,
      _id: `users:${user.username}`,
      type: "user",
    });
    return res;
  };
  register = async (user) => {
    // console.log(product);
    const res = await this.db.put({
      ...user,
      _id: `users:${user.username}`,
      type: "user",
      isAdmin: true,
    });
    return res;
  };

  login = async (user) => {
    // let db = this.db;
    await this.db;
    // .createIndex({
    //   index: { fields: ["type", "username", "password"] },
    // })
    // .catch((err) => console.log(err));
    await this.db
      .find({
        selector: {
          type: "users",
          username: user.username,
          password: user.password,
        },
        // sort: ["createdAt"],
      })
      .then((res) => {
        // return res;
      })
      .catch((err) => console.log(err));
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
    await this.db
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
  addDeposit = async (cash, transfer, customer) => {
    // console.log(customer);
    // return;
    let user = localStorage["username"];
    await this.db
      .get(customer._id)
      .then((doc) => {
        doc.paid += parseInt(cash) + parseInt(transfer);
        if (doc.paid === doc.orders) doc.lastBalance = Date.now();
        return this.db.put(doc);
      })
      .then((_) => {
        return this.db.put({
          _id: "deposit:" + Date.now(),
          type: "deposit",
          createdAt: Date.now(),
          customer: customer.name,
          cashier: user,
          cash: parseInt(cash),
          transfer: parseInt(transfer),
        });
      })
      .then((doc) => {
        // console.log(doc);
        return doc;
      });
  };
  addWithdrawal = async (cash, transfer, seller) => {
    // console.log(customer);
    // return;
    let user = localStorage["username"];

    await this.db
      .get(seller._id)
      .then((doc) => {
        doc.paid += parseInt(cash) + parseInt(transfer);
        if (doc.paid === doc.orders) doc.lastBalance = Date.now();
        return this.db.put(doc);
      })
      .then((_) => {
        return this.db.put({
          _id: "withdrawal:" + Date.now(),
          type: "withdrawal",
          createdAt: Date.now(),
          seller: seller.name,
          cashier: user,
          cash: parseInt(cash),
          transfer: parseInt(transfer),
        });
      })
      .then((doc) => {
        // console.log(doc);
        return doc;
      });
  };
  makePurchase = async (bill, store) => {
    let db = this.db;
    const { products, seller, total, cash, transfer, createdAt } = bill;
    let items = {};
    let user = localStorage["username"];
    products.forEach((p, index) => {
      items = {
        ...items,
        [index]: { product: p.name, qty: p.qty, rate: p.rate },
      };
    });
    await this.db
      .bulkDocs([
        {
          _id: "purchase:" + createdAt,
          seller: seller,
          store: store,
          cashier: user,
          total: parseInt(total),
          paid: parseInt(cash) + parseInt(transfer),
          createdAt: createdAt,
          type: "purchase",
          items: items,
        },
        {
          _id: "withdrawal:" + createdAt,
          type: "withdrawal",
          seller: seller,
          cashier: user,
          cash: parseInt(cash),
          transfer: parseInt(transfer),
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
              doc.qty = parseInt(doc.qty) + parseInt(p.qty);
              doc.price = parseInt(p.price);
              doc.rate = parseInt(p.rate);
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
          // console.log(result);
          let doc = result.docs[0];
          doc.orders = parseInt(doc.orders) + parseInt(total);
          doc.paid = parseInt(doc.paid) + parseInt(cash) + parseInt(transfer);

          db.put(doc).then((res) => {
            // console.log(res);
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

  makeSales = async (bill, store) => {
    let db = this.db;
    const { products, user, customer, total, cash, transfer, createdAt } = bill;
    let items = {};
    products.forEach((p, index) => {
      items = {
        ...items,
        [index]: { product: p.name, qty: p.qty, price: p.price },
      };
    });
    await this.db
      .bulkDocs([
        {
          _id: "sales:" + createdAt,
          customer: customer,
          store: store,
          total: parseInt(total),
          paid: parseInt(cash) + parseInt(transfer),
          user: user,
          createdAt: createdAt,
          type: "sale",
          items: items,
        },
        {
          _id: "deposited:" + createdAt,
          type: "deposited",
          customer: customer,
          cashier: user,
          cash: parseInt(cash),
          transfer: parseInt(transfer),
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
              // console.log(result);
              let doc = result.docs[0];
              doc.orders = parseInt(doc.orders) + parseInt(total);
              doc.paid =
                parseInt(doc.paid) + parseInt(cash) + parseInt(transfer);
              if (doc.paid === doc.orders) doc.lastBalance = Date.now();
              db.put(doc).then((res) => {
                // console.log(res);
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
    return await this.getInvoice(createdAt);
  };
  getInvoice = async (salesId) => {
    let items = [];
    const invoice = {
      customer: "",
      createdAt: 0,
      billNo: salesId,
      total: 0,
      paid: 0,
    };

    await this.db.createIndex({
      index: { fields: ["type", "_id"] },
    });
    // console.log(from);
    await this.db
      .find({
        selector: {
          type: "sale",
          _id: "sales:" + salesId,
        },
        // fields: ["_id", "name"],
        // sort: ["createdAt"],
      })
      .then(function (res) {
        let sale = res.docs[0];
        // result.docs.forEach((s) => {
        //   // sales.total += s.total;
        //   // sales.paid += s.paid;
        //   // items = items.concat(Object.values(s.items));
        // });
        invoice.billNo = salesId;
        invoice.paid = sale.paid;
        invoice.total = sale.total;
        invoice.customer = sale.customer;
        invoice.createdAt = sale.createdAt;
        items = sale.items;
        invoice.cashier = sale.user;
        // yo, a result
      })
      .catch(function (err) {
        console.log(err);
        // ouch, an error
      });
    invoice.items = items;
    // console.log(invoice);
    return { invoice };
    // console.log(sales);
  };
  getSalesByDate = async (from, to, store) => {
    let sales = {
      total: 0,
      paid: 0,
    };
    let items = [];

    // console.log("selector", selector);

    await this.db.createIndex({
      index: { fields: ["type", "createdAt", "store"] },
    });
    await this.db
      .find({
        selector: {
          type: "sale",
          // createdAt: { $gt: from, $lt: to },
          store: store,
        },
        // fields: ["_id", "name"],
        // sort: ["createdAt"],
      })
      .then(function (result) {
        result.docs.forEach((s) => {
          if (s.createdAt >= from && s.createdAt <= to) {
            sales.total += parseInt(s.total);
            sales.paid += parseInt(s.paid);
            items = items.concat(Object.values(s.items));
            console.log("from ", from);
            console.log("this ", s.createdAt);
            console.log(("to ", to));
          }
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
  getUserSales = async (user, from, to) => {
    if (from) from = from.getTime();
    if (to) to = to.getTime();
    let orders = {
      total: 0,
      paid: 0,
    };
    let items = [];
    let selector = from
      ? {
          type: "sale",
          user: user,
          createdAt: { $gte: from, $lte: to },
        }
      : { type: "sale", user: user };
    await this.db.createIndex({
      index: { fields: ["type", "createdAt", "cashier"] },
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
          orders.total += parseInt(s.total);
          orders.paid += parseInt(s.paid);
          s.items[0].createdAt = s.createdAt;
          s.items[0].store = s.store;
          s.items[0].customer = s.customer;
          items = items.concat(Object.values(s.items));
          // console.log(s.store);
        });

        orders.items = items;

        // yo, a result
      })
      .catch(function (err) {
        console.log(err);
        // ouch, an error
      });
    return orders;
  };
  getCustomerOrders = async (customer, from, to) => {
    if (from) from = from.getTime();
    if (to) to = to.getTime();
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
          orders.total += parseInt(s.total);
          orders.paid += parseInt(s.paid);
          s.items[0].createdAt = s.createdAt;
          s.items[0].store = s.store;
          items = items.concat(Object.values(s.items));
          // console.log(s.store);
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

  getSellerOrders = async (seller, from, to) => {
    if (from) from = from.getTime();
    if (to) to = to.getTime();
    let orders = {
      total: 0,
      paid: 0,
    };
    let items = [];
    let selector = from
      ? {
          type: "purchase",
          seller: seller,
          createdAt: { $gte: from, $lte: to },
        }
      : { type: "purchase", seller: seller };
    await this.db.createIndex({
      index: { fields: ["type", "createdAt", "seller"] },
    });
    await this.db
      .find({
        selector: selector,
        // fields: ["_id", "name"],
        // sort: ["createdAt"],
      })
      .then(function (result) {
        result.docs.forEach((s) => {
          orders.total += parseInt(s.total);
          orders.paid += parseInt(s.paid);
          s.items[0].createdAt = s.createdAt;
          s.items[0].store = s.store;
          items = items.concat(Object.values(s.items));
          // console.log(s.store);
        });

        orders.items = items;

        // yo, a result
      })
      .catch(function (err) {
        console.log(err);
        // ouch, an error
      });
    // console.log(orders);

    return orders;
  };
  getDeposits = async (customer, from, to) => {
    if (from) from = from.getTime();
    if (to) to = to.getTime();
    // let orders = {
    //   total: 0,
    //   paid: 0,
    // };
    // let items = [];
    let deposits = {};
    let selector = {
      type: "deposit",
    };
    if (from && to) {
      selector["createdAt"] = { $gte: from, $lte: to };
    }
    if (customer !== "") {
      selector["customer"] = customer;
    }
    // console.log(selector);
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
        result.docs.forEach((dep) => {
          deposits = dep;
          // console.log(s.store);
        });

        // yo, a result
      })
      .catch(function (err) {
        console.log(err);
        // ouch, an error
      });
    // console.log(deposits);
    return deposits;
  };
}
