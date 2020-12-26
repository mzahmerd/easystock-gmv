import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";

PouchDB.plugin(PouchDBFind); // install the pouchdb-find plugin
const localDB = new PouchDB("easystock_gmv");
let remoteDB = undefined;
// try to get remote database credentials from a file (use secret.js.template as an example)
// user can alternatively enter this connection string in the app by clicking the settings gear icon
try {
  let Credentials = require("./secret");
  if (Credentials.default.remote_url) {
    remoteDB = new PouchDB(Credentials.default.remote_url);
  }
} catch (ex) {
  console.log("secret.js file missing; disabling remote sync.");
}
ReactDOM.render(
  <App localDB={localDB} remoteDB={remoteDB} />,
  document.getElementById("root")
);
