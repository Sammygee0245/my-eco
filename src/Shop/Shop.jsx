import React, { useEffect, useState } from "react";
import "./Shop.css";
import NavBar from "../NavBar/NavBar";
import Data from "../Data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faSearch } from "@fortawesome/free-solid-svg-icons";

function Shop() {
  let [datta, setDatta] = useState(Data);
  let basket = JSON.parse(localStorage.getItem("shopProduct")) || [];

  let [cartupdate, setCartUpadate] = useState("");

  // input for filtering products
  let [prodfilter, setProdFilter] = useState("");

  //handle productfilter change
  function handleProductfilterChange(e) {
    setProdFilter(e.target.value);
  }

  function clear() {
    let inputBox = prodfilter;

    if (inputBox === "") {
      setDatta(Data);
      console.log("Empty");
    }
  }

  function emptyResult() {
    let searchProd = prodfilter.toLowerCase();
    let result = datta.filter((x) =>
      x.source.toLowerCase().includes(searchProd),
    );

    if (result.length === 0) {
      setDatta([]);
      console.log("Zero result");
    } else {
      setDatta(result);
    }
  }

  function filter() {
    let searchProd = prodfilter.toLowerCase();
    let result = datta.filter((x) =>
      x.source.toLowerCase().includes(searchProd),
    );

    // console.log(result);

    if (result.length > 0) {
      setDatta(result);
    } else {
      setDatta(Data);
    }

    emptyResult();
    clear();
  }

  // console.log(prodfilter);

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
  }

  useEffect(() => {
    updateCartNum();
  });

  return (
    <div className="center-all">
      <NavBar cartupdate={cartupdate} />
      <nav className="storesearch">
        <div className="fiter-div">
          <input
            onKeyUp={filter}
            type="text"
            placeholder="Search Produt"
            className="fiterInput"
            onChange={handleProductfilterChange}
            value={prodfilter}
          />
          <FontAwesomeIcon
            title="Double click on the searchbar"
            onClick={filter}
            icon={faSearch}
            className="filter-btn"
          >
            filter
          </FontAwesomeIcon>
        </div>
      </nav>

      <div className="shop-main-div">
        <div className="product-shelf">
          {datta.length !== 0 ? (
            datta
              .map((p) => {
                let { urlToImage, id, source, price, dec } = p;
                let search = basket.find((x) => x.id === id);

                return (
                  <div
                    key={Math.random() * 123000}
                    className="prod"
                  >
                    <img
                      className="prod-img"
                      src={urlToImage}
                      alt={source.name}
                    />
                    <div className="prod-info">
                      <p className="prod-desc ">{source}</p>
                      <p className="prod-price">${price}</p>
                      <div className="prod-mani">
                        <FontAwesomeIcon
                          className="plus"
                          onClick={() => increament(id)}
                          icon={faPlus}
                        ></FontAwesomeIcon>
                        <p
                          id={id}
                          className="prod-quantity"
                        >
                          {search === undefined ? 0 : search.item}
                        </p>
                        <FontAwesomeIcon
                          className="minus"
                          onClick={() => decreament(id)}
                          icon={faMinus}
                        ></FontAwesomeIcon>
                      </div>
                    </div>
                  </div>
                );
              })
              .slice(0, 8)
          ) : (
            <h1 className="Err-message">Not Available</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Shop;
