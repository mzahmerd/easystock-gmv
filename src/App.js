import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Report from "./pages/Report";
import Store from "./pages/Store";
import Sales from "./pages/Sales";
import Purchase from "./pages/Purchase";
import Customers from "./pages/Customers";
import Sellers from "./pages/Sellers";
import Users from "./pages/Users";
import MyInvoice from "./pages/MyInvoice";

import DB from "./db";
import Login from "./pages/Login";
import { Alert, Modal, Button } from "react-bootstrap";
import { Text } from "@react-pdf/renderer";

class App extends Component {
  constructor(props) {
    super(props);
    // manage remoteDB here because user might change it via the UI
    // but don't put it in state because changing the backend db doesn't require a re-render
    // this.remoteDB = props.remoteDB;
    this.db = new DB("gmv");
    // this.db.db.info().then(function (info) {
    //   // console.log(info);
    // });
    this.state = {
      loading: true,
      modalOpen: false,
      selectedStore: "main",
      invoice: {},
      stores: {},
      store: {},
      products: {},
      customers: {},
      sellers: {},
      purchase: {},
      sales: {},
      users: {},
      isLogin: localStorage.getItem("isLogin"),
      username: localStorage.getItem("username"),
      isAdmin: this.toBool(localStorage.getItem("isAdmin")),
    };
    // console.log(localStorage["username"]);
  }
  loadData = async () => {
    const stores = await this.db.getStores();
    const {
      store,
      sellers,
      customers,
      purchase,
      sales,
      users,
    } = await this.db.getAllDocs(this.state.selectedStore);
    this.setState({
      stores: stores,
      store: store,
      // products: store.products,
      customers: customers,
      sellers: sellers,
      purchase: purchase,
      sales: sales,
      users: users,
      loading: false,
    });
  };
  componentDidMount = () => {
    this.loadData();
  };
  addStore = async (store) => {
    const { id } = await this.db.addStore(store);
    const { stores } = this.state;

    this.setState({
      stores: {
        ...stores,
        [id]: store,
      },
    });
    this.loadData();
  };
  changeStore = async (store) => {
    await this.setState({
      selectedStore: store,
      loading: true,
    });
    this.loadData();
  };
  addCustomer = async (customer) => {
    const { id } = await this.db.addCustomer(customer);
    const { customers } = this.state;
    customer._id = id;
    this.setState({
      customers: {
        ...customers,
        [id]: customer,
      },
    });
    this.loadData();
  };
  addSeller = async (seller) => {
    const { id } = await this.db.addSeller(seller);
    const { sellers } = this.state;
    seller._id = id;
    this.setState({
      sellers: {
        ...sellers,
        [id]: seller,
      },
    });
    this.loadData();
  };
  addUser = async (user) => {
    const { id } = await this.db.addUser(user);
    const { users } = this.state;
    user._id = id;
    this.setState({
      users: {
        ...users,
        [id]: user,
      },
    });
    this.loadData();
  };
  addProduct = async (product) => {
    const { id } = await this.db.addProduct(product, this.state.selectedStore);
    const { store } = this.state;

    this.setState({
      store: {
        ...store,
        [id]: product,
      },
    });
    this.loadData();
  };
  updateProduct = async (product) => {
    const newProduct = await this.db.updateProduct(product);
    const { store } = this.state;

    this.setState({
      store: {
        ...store,
        [product._id]: newProduct,
      },
    });
    this.loadData();
  };
  getSalesByDate = async (from, to) => {
    const sales = await this.db.getSalesByDate(from.getTime(), to.getTime());
    sales
      ? this.setState({
          sales: sales,
        })
      : this.setState({
          sales: {},
        });
    // console.log(sales);
  };
  getCustomerOrders = async (customer, from, to) => {
    const orders = await this.db.getCustomerOrders(
      customer,
      from.getTime(),
      to.getTime()
    );
    // console.log(orders);
    return orders;
  };
  makePurchase = async (bill) => {
    await this.db.makePurchase(bill);
    this.loadData();
    // console.log(store);
  };
  makeSales = async (bill) => {
    // this.printInvoice(1343566);
    // return;
    const invoice = await this.db.makeSales(bill);
    // this.setState({
    //   invoice: invoice
    // })

    return invoice;
    // if (invoice) this.comfirmPrint(invoice);
    // console.log(store);
  };
  comfirmPrint = async (invoice) => {
    this.setState({
      invoice: invoice,
    });
  };
  storeProducts = (store) => {
    console.log("item" + this.state.store[0]);
    return this.state.store[0];
  };
  printInvoice = () => {
    this.setState({
      printing: true,
    });
    // ReactDOM.render(
    //   <MyInvoice saleId={saleId} />,
    //   document.getElementById("invoice")
    // );
  };
  logout = () => {
    this.setState({
      isLogin: false,
    });
  };
  toBool = (s) => {
    return s === "true" ? true : false;
  };
  addDeposit = async (cash, transfer, customer) => {
    const res = await this.db.addDeposit(
      parseInt(cash),
      parseInt(transfer),
      customer
    );
    // console.log(res);
    this.loadData();
    // console.log(parseInt(cash) + parseInt(transfer), customer);
  };
  addWithdrawal = async (cash, transfer, seller) => {
    const res = await this.db.addWithdrawal(
      parseInt(cash),
      parseInt(transfer),
      seller
    );
    // console.log(res);
    this.loadData();
    // console.log(parseInt(cash) + parseInt(transfer), customer);
  };
  register = async (user, code) => {
    if (code === "4g6m8v") {
      let res = await this.db.register(user, code);
      if (res.ok) {
        alert("user registered!");
        localStorage.setItem("isAdmin", true);
        localStorage.setItem("username", user.username);
        localStorage.setItem("isLogin", true);

        this.setState({
          isLogin: true,
          isAdmin: true,
          username: user.username,
        });
      }
    } else {
      alert("Code incorrect contact Administrator");
    }
  };
  login = async (user) => {
    // await this.db.login(user);
    // return;
    // if (await this.db.login(user)) {
    //   this.loadData();
    // }
    let exist = this.state.users[`users:${user.username}`];
    if (exist) {
      if (exist.password === user.password) {
        localStorage.setItem("isAdmin", !!exist.isAdmin);
        localStorage.setItem("username", exist.username);
        localStorage.setItem("isLogin", true);

        this.setState({
          isLogin: true,
          isAdmin: exist.isAdmin,
          username: exist.username,
        });
      } else {
        alert("password incorrect!");
      }
    } else {
      alert("user not registered!");
    }
  };
  renderPage = () => {
    if (this.state.isLogin) {
      // this.setState({
      //   isAdmin: this.isAdmin(localStorage.getItem("username")),
      // });
      return (
        <Router>
          <Navbar
            isAdmin={this.state.isAdmin}
            logout={this.logout}
            stores={Object.values(this.state.stores)}
            selectedStore={this.state.selectedStore}
            changeStore={this.changeStore}
          />

          <div style={{ marginLeft: 0 + "px" }}>{this.renderContent()}</div>
        </Router>
      );
    }
    return (
      <Login
        users={this.state.users}
        login={this.login}
        register={this.register}
      />
    );
  };
  renderContent = () => {
    if (this.state.loading) {
      return;
    }

    return (
      <Switch>
        <Route
          path="/"
          exact
          component={(props) => (
            <Store
              {...props}
              store={this.state.store}
              // stores={Object.values(this.state.stores)}
              addStore={this.addStore}
              addProduct={this.addProduct}
              isAdmin={this.state.isAdmin}
            />
          )}
        />
        <Route
          path="/Sales"
          exact
          component={(props) => (
            <Sales
              {...props}
              customers={this.state.customers}
              stores={this.stores}
              store={this.state.store}
              comfirmPrint={this.comfirmPrint}
              makeSales={this.makeSales}
              isAdmin={this.state.isAdmin}
            />
          )}
        />
        <Route
          path="/Purchase"
          exact
          component={(props) => (
            <Purchase
              {...props}
              sellers={this.state.sellers}
              stores={this.stores}
              products={this.state.store.products}
              makePurchase={this.makePurchase}
            />
          )}
        />
        <Route
          path="/Customers"
          component={(props) => (
            <Customers
              {...props}
              customers={this.state.customers}
              addCustomer={this.addCustomer}
              addDeposit={this.addDeposit}
            />
          )}
        />
        <Route
          path="/Sellers"
          component={(props) => (
            <Sellers
              {...props}
              sellers={this.state.sellers}
              addSeller={this.addSeller}
              addWithdrawal={this.addWithdrawal}
            />
          )}
        />
        <Route
          path="/Report"
          component={(props) => (
            <Report
              {...props}
              sellers={this.state.sellers}
              customers={this.state.customers}
              sales={this.state.sales}
              purchase={this.state.purchase}
              getCustomerOrders={this.getCustomerOrders}
              getSalesByDate={this.getSalesByDate}
              isAdmin={this.state.isAdmin}
            />
          )}
        />
        <Route
          path="/Users"
          component={(props) => (
            <Users {...props} users={this.state.users} addUser={this.addUser} />
          )}
        />
        <Route
          path="/Report/:productId"
          component={(props) => (
            <Report
              {...props}
              store={this.state.store[props.match.params.productId]}
            />
          )}
        />
        <Route
          path="/Invoice"
          exact
          component={(props) => (
            <MyInvoice {...props} invoice={this.state.invoice} />
          )}
        />
      </Switch>
    );
  };
  render() {
    // localStorage.setItem("isLogin", null);
    // localStorage.setItem("isAdmin", false);
    // localStorage.setItem("username", "admin");

    return (
      <>
        {this.renderPage()}
        {/* <Router>
          <Navbar
            stores={Object.values(this.state.stores)}
            selectedStore={this.state.selectedStore}
            changeStore={this.changeStore}
          />
          <div style={{ marginLeft: 0 + "px" }}>{this.renderContent()}</div>
        </Router> */}
      </>
    );
  }
}

export default App;
