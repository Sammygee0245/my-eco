import React from "react";
import "./ErrorPage.css";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="page-404">
      <h1 className="four-o-four">404</h1>
      <h2 className="err-message">
        The page you are seaching for can not be found.{" "}
      </h2>
      <p>But do not worry we will figure it out together :)</p>
      <button className="batost">
        <Link
          className="stlk"
          to="/shop"
        >
          Back to Store
        </Link>
      </button>
    </div>
  );
}

export default ErrorPage;
