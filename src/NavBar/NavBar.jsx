import React, { useState } from "react";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function NavBar(props) {
  // let [cartupdate, setCartUpdate] = useState("0");
  let basket = JSON.parse(localStorage.getItem("shopProduct")) || [];

  return (
    <div>
      <nav className="nav-bar">
        <h2 className="logo">Logo</h2>
        <ul className="ul1">
          <li className=" list1">
            <Link to="/" className="link1">
              home
            </Link>
          </li>
          <li className=" list1">
            <Link to="/shop" className="link1">
              shop
            </Link>
          </li>
          <li className=" list1">
            <Link to="/cart" className="link1">
              <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
              <p id="cart-prod-num" className="cart-prod-num">
                0
              </p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
