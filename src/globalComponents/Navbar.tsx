import { useState } from "react";
import { Link } from "react-router-dom";
interface WhatProps {
  what: number;
}

const Navbar: React.FC<WhatProps> = ({ what }) => {
  const [Shown, setShown] = useState(false);
  return (
    <>
      <nav dir="ltr">
        <Link to="/" className="title">
          <i className="fa-solid fa-bars-staggered"></i> toDo list
        </Link>
        <div className="nav-md-items">
          <Link to="/setting" className={what === 2 ? "selected" : ""}>
            تنظیمات
          </Link>
          <Link to="/info" className={what === 3 ? "selected" : ""}>
            درباره ما
          </Link>
        </div>
        <span
          onClick={() => {
            setShown(!Shown);
          }}
          className="fa fa-bars"
        ></span>
      </nav>
      <div dir="ltr" className={Shown ? "nav-items shown" : "nav-items"}>
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
          وظایف
        </Link>
        <Link to="/setting" className={what === 2 ? "selected" : ""}>
          <span className="fa fa-gear"></span> تنظیمات
        </Link>
        <Link
          to="/info"
          className={what === 3 ? "selected text-nowrap" : "text-nowrap"}
        >
          <span className="fa fa-info-circle"></span> درباره ما
        </Link>
      </div>
    </>
  );
};

export default Navbar;
