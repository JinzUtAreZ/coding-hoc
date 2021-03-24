import React from "react";
// FIX: if picture is SVG use code below
//import { ReactComponent as Logo } from "../../assets/wonders.png";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import logo from "../../assets/wonders.png";
import { setCurrentUser } from "../../redux/users/users.actions";
import { selectCurrentUser } from "../../redux/users/users.selectors";
import "./header.css";

const header = ({ currentUser, logOutUser }) => {
  return (
    <div className="headerNavi">
      <Link className="headerNavi--logo-container" to="/">
        <img
          src={logo}
          alt="company"
          style={{ width: "150px", height: "30px" }}
        />
      </Link>
      <div className="headerNavi--options">
        <Link className="headerNavi__option" to="/shop">
          SHOP
        </Link>
        <Link className="headerNavi__option" to="/Admin/Orders">
          AdminOrders
        </Link>
        <Link className="headerNavi__option" to="/Admin/Products">
          ADminProducts
        </Link>
        <Link className="headerNavi__option" to="/Admin/Home">
          AdminHome
        </Link>
        <Link className="headerNavi__option" to="/about">
          About
        </Link>
        {currentUser ? (
          <Link
            className="headerNavi__option"
            to="/SignOut"
            onClick={() => logOutUser()}
          >
            Sign Out
          </Link>
        ) : (
          <Link className="headerNavi__option" to="/SignIn">
            Sign In
          </Link>
        )}
        <Link className="headerNavi__option" to="/Admin/Home">
          CONTACT
        </Link>
        <Link className="headerNavi__option" to="/tables">
          DataTables
        </Link>
        <Link className="headerNavi__option" to="/tables2">
          DataTables 2
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  logOutUser: () => dispatch(setCurrentUser(null)),
});

export default connect(mapStateToProps, mapDispatchToProps)(header);
