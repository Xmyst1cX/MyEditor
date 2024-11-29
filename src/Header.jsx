import React from "react";
import logo from "./assets/logo.png";
import ds from "./assets/discord.png";

<link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css"></link>

const Header = () => {
  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <img src={logo} alt="Logo" style={imgStyle} />
        <ul style={ulStyle}>
          <li style={liStyle}>Home</li>
          <li style={liStyle}>About</li>
          <li style={liStyle}>Contact</li>
        </ul>
        <a href="https://discord.gg/fvtGDS9m4D" target="_blank" style={buttonDiscord}><button style={discord}><img src={ds} alt="discord" style={imgDiscord}/></button></a>
      </nav>
    </header>
  );
};

// Стили
const headerStyle = {
    position: "fixed", // Для точного позиционирования
    top: "10px",          // Отступ сверху
    left: "50%",          // Начальная точка от левого края
    transform: "translateX(-50%)", // Центровка по горизонтали
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80px",
    backgroundColor: "#161617d9",
    borderRadius: "15px",
    width: "65%",
    zIndex: "10",
  };

const navStyle = {
  display: "flex",
  alignItems: "center",
  width: "100%",
};

const ulStyle = {
  display: "flex",
  listStyle: "none",
  margin: 0,
  padding: 0,
  marginLeft: "20px", // Отступ между логотипом и меню
};

const liStyle = {
  margin: "0 10px",
  padding: "10px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const imgStyle = {
  height: "50px",
  cursor: "pointer",
  marginRight: "-30px",
  borderRadius: "15px",
  marginLeft: "15px",
};

const buttonDiscord = {
  marginLeft: "auto",
  marginRight: "15px",
};

const discord = {
  width: "35px",
  height: "35px",
  borderRadius: "5px",
  border: "1px solid rgba(34, 34, 35, 0.73)",
  backgroundColor: "rgba(22, 22, 23, 0.85)",
  padding: "0px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const imgDiscord = {
  height: "25px",
  width: "25px",
  cursor: "pointer",
  display: "block",
};

export default Header;