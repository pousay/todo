import { useState } from "react";
import { Link } from "react-router-dom";
interface WhatProps {
  what: number;
}

const Navbar: React.FC<WhatProps> = ({ what }) => {
  const [Shown, setShown] = useState(false);
  return (
    <>
      <nav>
        <Link to="/" className="title">
          <i className="fa-solid fa-bars-staggered"></i> toDo list
        </Link>
        <div className="nav-md-items">
          <Link to="/info" className={what === 3 ? "selected" : ""}>
            info
          </Link>
          <Link to="/setting" className={what === 2 ? "selected" : ""}>
            settings
          </Link>
        </div>
        <span
          onClick={() => {
            setShown(!Shown);
          }}
          className="fa fa-bars"
        ></span>
      </nav>
      <div className={Shown ? "nav-items shown" : "nav-items"}>
        <div
          className="nav-back"
          onClick={() => {
            setShown(false);
          }}
        >
          <span className="fa fa-close"></span>
        </div>

        <Link
          to="/"
          className={
            what === 1
              ? "fa fa-bars-staggered selected"
              : "fa fa-bars-staggered"
          }
        >
          Todos
        </Link>
        <Link to="/setting" className={what === 2 ? "selected" : ""}>
          <span className="fa fa-gear"></span> settings
        </Link>
        <Link to="/info" className={what === 3 ? "selected" : ""}>
          <span className="fa fa-info-circle"></span> info
        </Link>
      </div>
    </>
  );
};

export default Navbar;
