import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-content">
        <h2>Your favorite meals, delivered fast</h2>
        <p>
          Discover tasty dishes from a diverse menu, prepared by skilled chefs
          and delivered fresh to your door. Yumora brings comfort food and new
          flavors right to you.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
