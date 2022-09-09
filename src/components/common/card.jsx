import React from "react";

import { Link } from "react-router-dom";
import "../../css/card.css";

export default function Card({ label, route }) {
  return (
    <Link className="col cards crd m-4" to={route}>
      <div>
        <i className="fa-solid fa-book-blank" />
      </div>
      <div>
        <h5>{label}</h5>
      </div>
    </Link>
  );
}
