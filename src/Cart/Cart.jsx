import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import "./Cart.css";
import Data from "../Data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Cart() {
  let basket = JSON.parse(localStorage.getItem("shopProduct")) || [];

  let [cartupdate, setCartUpadate] = useState("");

  //   increase products quantity
  function increament(id) {
    let productId = id;
    let search = basket.find((x) => x.id === productId);
    if (search === undefined) {
      basket.push({ id: productId, item: 1 });
    } else {
      search.item += 1;
    }
    update(productId);

    localStorage.setItem("shopProduct", JSON.stringify(basket));
  }
  // Bug
  //   decrease products quantity
  function decreament(id) {
    let productId = id;
    let search = basket.find((x) => x.id === productId);
    if (search === undefined) {
      return;
    } else if (search.item === 0) {
      return;
    } else {
      search.item -= 1;
    }
    update(productId);
    basket = basket.filter((x) => x.item !== 0);
    localStorage.setItem("shopProduct", JSON.stringify(basket));
  }

  function update(id) {
    let productId = id;
    let search = basket.find((x) => x.id === productId);
    document.getElementById(productId).innerHTML = search.item;
    updateCartNum();
  }

  function updateCartNum() {
    let cartTotalNum = basket.map((x) => x.item).reduce((p, c) => p + c, 0);
    setCartUpadate(cartTotalNum);
    calcTotalBill();
  }

  function trash(id) {
    let productId = id;
    basket = basket.filter((x) => x.id !== productId);
    updateCartNum();
    localStorage.setItem("shopProduct", JSON.stringify(basket));
  }

  function calcTotalBill() {
    let TotalBill = basket
      .map((x) => {
        let { id, item } = x;
        let search = Data.find((x) => x.id === id);
        return item * search.price;
      })
      .reduce((p, c) => p + c, 0);

    document.getElementById("totalbill").innerHTML = ` $${TotalBill}`;
  }

  useEffect(() => {
    updateCartNum();
  });

  return (
    <div>
      <NavBar cartupdate={cartupdate} /> Cart
      <nav className="storesearch">
        <div className="fiter-div">
          <div className="totalbill-div">
            <h2>Total Bill:</h2>
            <h2 id="totalbill">$67</h2>
          </div>
        </div>
      </nav>
      <div className="cart-main-div">
        {basket.length !== 0 ? (
          basket.map((p) => {
            let { id, item } = p;
            let search = Data.find((x) => x.id === id);
            let { urlToImage, source, dec, price } = search;

            return (
              <div
                key={Math.random() * 123000}
                className="cart-prod"
              >
                <img
                  className="cart-prod-img"
                  src={urlToImage}
                  alt={source.name}
                />
                <div className="cart-prod-info">
                  <p className="cart-prod-desc ">{dec}</p>
                  <p className="cart-prod-price">
                    <span style={{ fontSize: "13px" }}>$</span>
                    {price}
                  </p>

                  <h3>
                    subTotal:{" "}
                    <span style={{ color: "red" }}>${price * item}</span>
                  </h3>
                  <div className="cart-prod-mani">
                    <FontAwesomeIcon
                      onClick={() => increament(id)}
                      icon={faPlus}
                    ></FontAwesomeIcon>
                    <p
                      id={id}
                      className="cart-prod-quantity"
                    >
                      {basket.length === 0 ? 0 : item}
                    </p>
                    <FontAwesomeIcon
                      onClick={() => decreament(id)}
                      icon={faMinus}
                    ></FontAwesomeIcon>
                  </div>
                  <FontAwesomeIcon
                    onClick={() => trash(id)}
                    className="trash"
                    icon={faTrashCan}
                  ></FontAwesomeIcon>
                </div>
              </div>
            );
          })
        ) : (
          <div className="cart-empty-div">
            <h1>Cart Empty</h1>
            <button className="batost">
              <Link
                className="stlk"
                to="/shop"
              >
                Back to Store
              </Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
