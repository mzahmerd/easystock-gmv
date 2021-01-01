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
import Invoice from "./pages/Invoice";

import DB from "./db";
import Login from "./pages/Login";

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
      selectedStore: "main",
      stores: {},
      products: {},
      customers: {},
      sellers: {},
      purchase: {},
      sales: {},
      users: {},
      isLogin: true,
      isAdmin: false,
    };
  }
  loadData = async () => {
    const stores = await this.db.getStores();
    const {
      products,
      sellers,
      customers,
      purchase,
      sales,
      users,
    } = await this.db.getAllDocs(this.state.selectedStore);
    this.setState({
      stores: stores,
      products: products,
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
    const { products } = this.state;

    this.setState({
      products: {
        ...products,
        [id]: product,
      },
    });
    this.loadData();
  };
  updateProduct = async (product) => {
    const newProduct = await this.db.updateProduct(product);
    const { products } = this.state;

    this.setState({
      products: {
        ...products,
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
    // console.log(products);
  };
  makeSales = async (bill) => {
    // this.printInvoice(1343566);
    // return;
    await this.db.makeSales(bill);
    this.loadData();
    // console.log(products);
  };
  storeProducts = (store) => {
    console.log("item" + this.state.products[0]);
    return this.state.products[0];
  };
  printInvoice = (saleId) => {
    ReactDOM.render(
      <Invoice saleId={saleId} />,
      document.getElementById("invoice")
    );
  };
  login = async (user) => {
    await this.db.login(user);
    // return;
    // if (await this.db.login(user)) {
    //   this.loadData();
    // }
  };
  renderPage = () => {
    if (this.state.isLogin) {
      return (
        <Router>
          <Navbar
            stores={Object.values(this.state.stores)}
            selectedStore={this.state.selectedStore}
            changeStore={this.changeStore}
          />
          <div style={{ marginLeft: 0 + "px" }}>{this.renderContent()}</div>
        </Router>
      );
    }
    return <Login users={this.state.users} login={this.login} />;
  };
  renderContent = () => {
    if (this.state.loading) {
      return;
    }
    return (
      <Switch>
        {/* <Route
          path="/"
          exact
          component={(props) => <Login {...props} users={this.state.users} />}
        /> */}
        <Route
          path="/"
          exact
          component={(props) => (
            <Store
              {...props}
              products={this.state.products}
              // stores={Object.values(this.state.stores)}
              addStore={this.addStore}
              addProduct={this.addProduct}
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
              products={this.state.products}
              makeSales={this.makeSales}
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
              products={this.state.products}
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
              products={this.state.products[props.match.params.productId]}
            />
          )}
        />
        <Route
          path="/Invoice"
          exact
          component={(props) => <Invoice {...props} salesId={123345657765} />}
        />
      </Switch>
    );
  };
  render() {
    // localStorage.setItem("isLogin", null);
    localStorage.setItem("isAdmin", false);
    localStorage.setItem("username", "admin");

    return <>{this.renderPage()}</>;
  }
}

export default App;
