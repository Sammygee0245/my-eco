import React from "react";
import "./ErrorPage.css";

function ErrorPage() {
  return (
    <div className="page-404">
      <h1 className="four-o-four">404</h1>
      <h2 className="err-message">
        The page you are seaching for can not be found.{" "}
      </h2>
      <p>But do not worry we will figure it out together :)</p>
    </div>
  );
}

export default ErrorPage;
