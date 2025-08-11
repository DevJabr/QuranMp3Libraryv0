import React from "react";
import "./Navbar.css";
import QuranPic from "../../assets/QuranLogo.png";
import { Link } from "react-router";
const Navbar = () => {
  return (
    <div className="nav">
      <div className="right">
        <Link to="/">
          <img src={QuranPic} width={80} className="logo" />
        </Link>
      </div>

      <div className="left">
        <Link to="/">
          <button>
            <i class="fa-solid fa-podcast"></i>
          </button>
        </Link>
        <Link to="/recite">
          <button>
            <i class="fa-solid fa-headphones"></i>
          </button>
        </Link>
        <Link to="https://quranapi.pages.dev/">
          <button>
            <i class="fa-solid fa-globe"></i>{" "}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
