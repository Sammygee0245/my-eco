import React, { useState } from "react";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function NavBar(props) {
  let [show, setShow] = useState("");

  function displayShow() {
    setShow(!show);
  }
  console.log(show);
  return (
    <div>
      <nav className="nav-bar">
        <div className="logo"></div>
        <ul className="ul1">
          <li className=" list1">
            <Link
              to="/"
              className="link1"
            >
              home
            </Link>
          </li>

          <li className=" list1">
            <Link
              to="/shop"
              className="link1"
            >
              shop
            </Link>
          </li>

          <li className=" list1">
            <Link
              to="/contact"
              className="link1"
            >
              contact
            </Link>
          </li>

          <li className=" list1">
            <Link
              to="/cart"
              className="link1"
            >
              <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
              <p
                id="cart-prod-num"
                className="cart-prod-num"
              >
                {props.cartupdate}
              </p>
            </Link>
          </li>
        </ul>
        <div className="bar-cart">
          <FontAwesomeIcon
            onClick={displayShow}
            icon={faBars}
            className="menu"
          >
            Tog
          </FontAwesomeIcon>
          <Link
            to="/cart"
            className="link1"
          >
            <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
            <p
              id="cart-prod-num"
              className="cart-prod-num2"
            >
              {props.cartupdate}
            </p>
          </Link>
        </div>

        {show && (
          <ul className="ul2">
            <li className=" list2">
              <Link
                to="/"
                className="link1"
              >
                home
              </Link>
            </li>

            <li className=" list2">
              <Link
                to="/shop"
                className="link1"
              >
                shop
              </Link>
            </li>

            <li className=" list2">
              <Link
                to="/contact"
                className="link1"
              >
                contact
              </Link>
            </li>

            <li className=" list2">
              <Link
                to="/cart"
                className="link1"
              >
                <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
                <p
                  id="cart-prod-num"
                  className="cart-prod-num"
                >
                  {props.cartupdate}
                </p>
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
}

export default NavBar;
