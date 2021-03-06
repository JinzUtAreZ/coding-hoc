import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import About from "../pages/About/About.comp";
import DataTables from "../pages/Datatables/DataTables1/LoadData.comp";
import DataTables2 from "../pages/Datatables/DataTables2/TableData.comp";
import DataTables3 from "../pages/Datatables/DataTables3/LoadData.comp";
import Home from "../pages/Home/Home.comp";
import SignIn from "../pages/Sign/SignIn/SignIn.comp";
import SignOut from "../pages/Sign/SignOut/SignOut.comp";
import { setCurrentUser } from "../redux/users/users.actions";
import { selectCurrentUser } from "../redux/users/users.selectors";
import Admin from "./admin.routes";

const main = ({ currentUser }) => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/Admin" component={Admin} />
      <Route
        exact
        path="/SignIn"
        render={() => (currentUser ? <Redirect to="/" /> : <SignIn />)}
      />
      <Route exact path="/about" component={About} />
      <Route exact path="/SignOut" component={SignOut} />
      <Route path="/tables" component={DataTables} />
      <Route path="/tables2" component={DataTables2} />
      <Route path="/tables3" component={DataTables3} />
      {/* <Route exact path="/ProfReport" component={ProfReport} />
      <Route component={ErrPage} /> */}
    </Switch>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser),
});

export default connect(mapStateToProps, mapDispatchToProps)(main);
