import React, { useEffect } from "react";
import "./Shop.css";
import NavBar from "../NavBar/NavBar";
import Data from "../Data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

function Shop() {
  let basket = JSON.parse(localStorage.getItem("shopProduct")) || [];

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
    let cartTotalNum = basket.map((x) => x.item).reduce((p, c) => p + c);
    document.getElementById("cart-prod-num").innerHTML = cartTotalNum;
  }

  return (
    <div>
      <NavBar />
      <div className="shop-main-div">
        <div className="product-shelf">
          {Data.length !== 0 ? (
            Data.map((p) => {
              let { urlToImage, id, source, price, dec } = p;
              let search = basket.find((x) => x.id === id);
              return (
                <div key={Math.random() * 123000} className="prod">
                  <img
                    className="prod-img"
                    src={urlToImage}
                    alt={source.name}
                  />
                  <div className="prod-info">
                    <p className="prod-desc ">{dec}</p>
                    <p className="prod-price">${price}</p>
                    <div className="prod-mani">
                      <FontAwesomeIcon
                        onClick={() => increament(id)}
                        icon={faPlus}></FontAwesomeIcon>
                      <p id={id} className="prod-quantity">
                        {search === undefined ? 0 : search.item}
                      </p>
                      <FontAwesomeIcon
                        onClick={() => decreament(id)}
                        icon={faMinus}></FontAwesomeIcon>
                    </div>
                  </div>
                </div>
              );
            }).slice(0, 8)
          ) : (
            <h1>Empty</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Shop;
