import React from "react";
import logo from "./assets/logo.png"; // Замените путь на ваш файл

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

export default Header;