import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AdminHome from "../pages/Admin/AdminHome.comp";
import AdminOrders from "../pages/Admin/AdminOrders.comp";
import AdminProd from "../pages/Admin/AdminProd.comp";

const admin = () => {
  return (
    <Switch>
      <Route path="/Admin/Home" component={AdminHome} />
      <Route path="/Admin/Products" component={AdminProd} />
      <Route path="/Admin/Orders" component={AdminOrders} />
      <Redirect exact from="/Admin" to="/Auth/Home" />
    </Switch>
  );
};

export default admin;
