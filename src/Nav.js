import React, { useEffect, useState } from "react";
import "./Nav.css";

function Nav() {
  const [show, handelShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handelShow(true);
      } else {
        handelShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);
  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
        alt="netflix logo"
      />
      <img
        className="nav__profile"
        src="https://tse2.mm.bing.net/th?id=OIP.mma3auc8Oyjo1G9p14lAkQHaHa&pid=Api&P=0&w=300&h=300"
        alt="sfs"
      />
    </div>
  );
}

export default Nav;
