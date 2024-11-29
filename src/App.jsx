import React, { useState } from "react";
import Header from "./Header";
import "./App.css";
import template from "./template.json"; // Импортируем JSON-шаблон

function App() {
  const [text, setText] = useState(""); // Состояние для ввода текста
  const [config, setConfig] = useState(template); // Локальное состояние JSON-конфига
  const [kits, setKits] = useState([]); // Состояние для хранения набора блоков
  const [selectedKitKey, setSelectedKitKey] = useState(null); // Выбранный набор для редактирования
  const [selectedKitType, setSelectedKitType] = useState("Standard"); // Состояние для типа набора
  const [kitPermission, setKitPermission] = useState("mykits.default");
  const [kitCooldown, setKitCooldown] = useState(600);
  const [wipeBlockCooldown, setWipeBlockCooldown] = useState(0);
  const [raidBlockEnabled, setRaidBlockEnabled] = useState(false); // По умолчанию "No"
  const [maxUsageCount, setMaxUsageCount] = useState(0);
  const [biome, setBiome] = useState(0);

  const biomeOptions = ["All", "Arid", "Temperate", "Tundra", "Arctic"];

  // Функция для добавления нового набора
  const handleAddKit = () => {
    if (!text.trim()) {
      alert("Введите название набора!"); // Если поле пустое
      return;
    }

    // Создание ключа для нового набора
    const kitKey = text.trim().replace(/\s+/g, "_").toLowerCase(); // Пробелы -> _, всё в нижний регистр

    // Проверяем, есть ли уже такой ключ
    if (config["Kit Settings"][kitKey]) {
      alert("Набор с таким именем уже существует!");
      return;
    }

    // Новый набор
    const newKit = {
      "Kit name": text.trim(),
      "Kit type (0 - Standard, 1 - Limited, 2 - Automatic)": selectedKitType === "Standard" ? 0 : selectedKitType === "Limited" ? 1 : 2,
      "Permission for kit": kitPermission,
      "Kit cooldown": kitCooldown,
      "Cooldown after wipe": wipeBlockCooldown,
      "Block kit usage during raid block?": raidBlockEnabled,
      "Maximum kit usage count": maxUsageCount,
      "Biome for auto-kit (0 - All, 1 - Arid, 2 - Temperate, 3 - Tundra, 4 - Arctic)": biome,
      "Kit items": {},
    };

    // Обновляем состояние JSON
    setConfig((prevConfig) => {
      const updatedConfig = { ...prevConfig };
      updatedConfig["Kit Settings"][kitKey] = newKit; // Добавляем новый набор
      return updatedConfig;
    });

    // Добавляем новый блок в меню
    setKits((prevKits) => [...prevKits, kitKey]);

    setText(""); // Очищаем текстовое поле
    setSelectedKitType("Standard");
    setKitPermission("mykits.default");
    setKitCooldown(600);
    setWipeBlockCooldown(0);
    setRaidBlockEnabled(false);
    setMaxUsageCount(0);
    setBiome(0);
  };

  // Функция для выбора набора для редактирования
  const handleSelectKit = (kitKey) => {
    setSelectedKitKey(kitKey); // Устанавливаем ключ выбранного набора
    const selectedKit = config["Kit Settings"][kitKey]; // Выбираем набор из конфигурации

    const kitTypeValue = selectedKit["Kit type (0 - Standard, 1 - Limited, 2 - Automatic)"];
    const kitType =
      kitTypeValue === 0 ? "Standard" : kitTypeValue === 1 ? "Limited" : "Automatic";

    setText(selectedKit["Kit name"]); // Загружаем название набора
    setSelectedKitType(kitType);
    setKitPermission(selectedKit["Permission for kit"]);
    setKitCooldown(selectedKit["Kit cooldown"]);
    setWipeBlockCooldown(selectedKit["Cooldown after wipe"]);
    setRaidBlockEnabled(selectedKit["Block kit usage during raid block?"]);
    setMaxUsageCount(selectedKit["Maximum kit usage count"]);
    setBiome(selectedKit["Biome for auto-kit (0 - All, 1 - Arid, 2 - Temperate, 3 - Tundra, 4 - Arctic)"]);
  };


  const handleRaidBlockToggle = () => {
    setRaidBlockEnabled((prevState) => !prevState); // Переключаем состояние
  };

  // Функция для сохранения изменений
  const handleSaveKit = () => {
    if (!selectedKitKey) return;

    const newKitName = text.trim();

    if (!newKitName) {
      alert("Название набора не может быть пустым");
      return;
    }

    // Проверяем, был ли изменен ключ
    const newKitKey = newKitName.replace(/\s+/g, "_").toLowerCase();

    if (newKitKey !== selectedKitKey) {
      // Если ключ был изменен, удаляем старый и добавляем новый
      const { [selectedKitKey]: oldKit, ...remainingKits } = config["Kit Settings"];
      const updatedConfig = {
        ...config,
        "Kit Settings": {
          ...remainingKits,
          [newKitKey]: {
            ...oldKit,
            "Kit name": newKitName,
            "Maximum kit usage count": maxUsageCount,
            "Kit type (0 - Standard, 1 - Limited, 2 - Automatic)": selectedKitType === "Standard" ? 0 : selectedKitType === "Limited" ? 1 : 2,
            "Permission for kit": kitPermission,
            "Kit cooldown": kitCooldown,
            "Cooldown after wipe": wipeBlockCooldown,
            "Block kit usage during raid block?": raidBlockEnabled,
            "Biome for auto-kit (0 - All, 1 - Arid, 2 - Temperate, 3 - Tundra, 4 - Arctic)": biome,
          },
        },
      };

      // Обновляем config и kits
      setConfig(updatedConfig);
      setKits((prevKits) => prevKits.map((kitKey) => (kitKey === selectedKitKey ? newKitKey : kitKey)));
    } else {
      // Если ключ не изменился, просто обновляем название
      setConfig((prevConfig) => {
        const updatedConfig = { ...prevConfig };
        updatedConfig["Kit Settings"][selectedKitKey] = {
          ...updatedConfig["Kit Settings"][selectedKitKey],
          "Kit name": newKitName,
          "Maximum kit usage count": maxUsageCount,
          "Kit type (0 - Standard, 1 - Limited, 2 - Automatic)": selectedKitType === "Standard" ? 0 : selectedKitType === "Limited" ? 1 : 2,
          "Permission for kit": kitPermission,
          "Kit cooldown": kitCooldown,
          "Cooldown after wipe": wipeBlockCooldown,
          "Block kit usage during raid block?": raidBlockEnabled,
          "Biome for auto-kit (0 - All, 1 - Arid, 2 - Temperate, 3 - Tundra, 4 - Arctic)": biome,
        };
        return updatedConfig;
      });
    }

    setSelectedKitKey(null); // Сброс выбранного набора
    setText(""); // Очищаем поле ввода
    setSelectedKitType("Standard");
    setKitPermission("mykits.default");
    setKitCooldown(600);
    setWipeBlockCooldown(0);
    setRaidBlockEnabled(false);
    setMaxUsageCount(0);
    setBiome(0);
  };

  // Функция для скачивания JSON
  const handleDownloadJSON = () => {
    const jsonData = JSON.stringify(config, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "config.json";
    link.click();

    URL.revokeObjectURL(url);
  };

  // Функция для деления на строки по 3 элемента
  const arrangeKits = (kitsArray) => {
    const rows = [];
    let currentRow = [];

    kitsArray.forEach((kitKey, index) => {
      currentRow.push({ kitKey, index: index + 1 }); // Добавляем объект с номером набора
      if (currentRow.length === 3 || index === kitsArray.length - 1) {
        rows.push(currentRow); // Добавляем текущий ряд в массив строк
        currentRow = []; // Очищаем текущий ряд
      }
    });

    return rows;
  };

  const handleDeleteKit = (kitKey) => {
    // Удаляем набор из массива kits
    setKits((prevKits) => prevKits.filter((kit) => kit !== kitKey));

    // Удаляем набор из объекта config
    setConfig((prevConfig) => {
      const updatedConfig = { ...prevConfig };
      delete updatedConfig["Kit Settings"][kitKey]; // Удаляем набор по ключу
      return updatedConfig;
    });
  };

  const handleKitTypeChange = (direction) => {
    const types = ["Standard", "Limited", "Automatic"];
    const currentIndex = types.indexOf(selectedKitType);
    let newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (newIndex < 0) newIndex = types.length - 1;
    if (newIndex >= types.length) newIndex = 0;
    setSelectedKitType(types[newIndex]); // Обновляем тип набора
  };

  const handleCooldownChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setKitCooldown(Number(value)); // Обновляем только если введено число
    }
  };

  const handleWipeCooldownChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setWipeBlockCooldown(Number(value)); // Обновляем только если введено число
    }
  };

  const handleBiomeChange = (direction) => {
    const newBiome =
      direction === "next" ? (biome + 1) % biomeOptions.length : (biome - 1 + biomeOptions.length) % biomeOptions.length;
    setBiome(newBiome);
  };

  return (
    <div>
      <Header />
      <div style={bodyStyle}>
        <div style={leftBlockStyle}>
          <button onClick={selectedKitKey ? handleSaveKit : handleAddKit} style={buttonStyle}>
            {selectedKitKey ? "🔄" : "+"}
          </button>
          <div style={SettingsBlock}>
            <p style={textStyle}>Введите название набора:</p>
            <textarea
              style={inputStyle}
              placeholder="Название набора"
              maxLength="100"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
          <div style={SettingsBlock}>
            <p style={textStyle}>Тип набора:</p>
            <div style={kitTypeContainerStyle}>
              <button onClick={() => handleKitTypeChange("prev")} style={arrowButtonStyle}>
                {"<"}
              </button>
              <div style={kitTypeDisplayStyle}>{selectedKitType}</div>
              <button onClick={() => handleKitTypeChange("next")} style={arrowButtonStyle}>
                {">"}
              </button>
            </div>
          </div>
          <div style={SettingsBlock}>
            <p style={textStyle}>Введите разрешение для набора:</p>
            <textarea
              style={inputStyle}
              placeholder="Разрешение на набор (например: mykits.default)"
              maxLength="100"
              value={kitPermission}
              onChange={(e) => setKitPermission(e.target.value)} // Обновляем состояние разрешения
            ></textarea>
          </div>
          <div style={SettingsBlock}>
            <p style={textStyle}>Кулдаун набора (в секундах):</p>
            <input
              type="number"
              style={inputStyle}
              value={kitCooldown}
              onChange={handleCooldownChange} // Обновляем только при числе
            />
          </div>
          <div style={SettingsBlock}>
            <p style={textStyle}>Кулдаун после вайпблока (в секундах):</p>
            <input
              type="number"
              style={inputStyle}
              value={wipeBlockCooldown}
              onChange={handleWipeCooldownChange} // Используем функцию обработки
            />
          </div>
          <div style={SettingsBlock}>
            <p style={textStyle}>Блокировка набора при рейд блоке:</p>
            <div style={kitTypeContainerStyle}>
              <button onClick={handleRaidBlockToggle} style={arrowButtonStyle}>
                {"<"}
              </button>
              <div style={kitTypeDisplayStyle}>{raidBlockEnabled ? "Yes" : "No"}</div>
              <button onClick={handleRaidBlockToggle} style={arrowButtonStyle}>
                {">"}
              </button>
            </div>
          </div>
          <div style={SettingsBlock}>
            <p style={textStyle}>Максимальное количество использований набора:</p>
            <input
              type="number"
              style={inputStyle}
              value={maxUsageCount}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setMaxUsageCount(Number(value)); // Обновляем только если введено число
                }
              }}
            />
          </div>
          <div style={SettingsBlock}>
            <p style={textStyle}>Выберите биом:</p>
            <div style={kitTypeContainerStyle}>
              <button onClick={() => handleBiomeChange("prev")} style={arrowButtonStyle}>
                {"<"}
              </button>
              <div style={kitTypeDisplayStyle}>{biomeOptions[biome]}</div>
              <button onClick={() => handleBiomeChange("next")} style={arrowButtonStyle}>
                {">"}
              </button>
            </div>
          </div>
          <button onClick={handleDownloadJSON} style={downloadButtonStyle}>
            Скачать конфигурацию
          </button>
        </div>
        <div style={rightBlockStyle}></div>
      </div>
      <div style={kitsContainerStyle}>
        {arrangeKits(kits).map((row, rowIndex) => (
          <div key={rowIndex} style={kitsRowStyle}>
            {row.map((kit, index) => (
              <div
                key={index}
                style={dividerPartStyle}
                onClick={() => handleSelectKit(kit.kitKey)} // Выбираем набор для редактирования
              >
                <div style={kitNumberStyle}>#{kit.index}</div> {/* Отображаем номер набора */}
                {kit.kitKey.replace(/_/g, " ")} {/* Преобразуем имя в человекочитаемое */}
                <button
                  style={deleteButtonStyle}
                  onClick={(e) => {
                    e.stopPropagation(); // Останавливаем всплытие события, чтобы не вызвать редактирование
                    handleDeleteKit(kit.kitKey); // Удаляем набор
                  }}
                >
                  -
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const bodyStyle = {
  display: "flex",
  position: "fixed",
  width: "65%",
  transform: "translateX(-50%)",
  top: "95px",
  gap: "5px",
};

const leftBlockStyle = {
  position: "relative",
  backgroundColor: "rgba(22, 22, 23, 0.85)",
  width: "35%",
  padding: "20px",
  borderRadius: "10px",
};

const rightBlockStyle = {
  backgroundColor: "rgba(22, 22, 23, 0.85)",
  width: "65%",
  padding: "20px",
  borderRadius: "10px",
};

const textStyle = {
  fontSize: "12px",
  color: "#A4A4A4",
  marginBottom: "0px",
  marginTop: "auto",
  textAlign: "left",
  marginLeft: "5px",
};

const inputStyle = {
  width: "97%",
  height: "25px",
  borderRadius: "5px",
  border: "1px solid #222223ba",
  backgroundColor: "rgba(22, 22, 23, 0.85)",
  resize: "none",
  paddingLeft: "10px",
  outline: "none",
  lineHeight: "25px",
  overflowX: "hidden",
  overflowY: "auto",
  scrollbarWidth: "none",
};

const kitTypeContainerStyle = {
  display: "flex",
  marginTop: "0px",
  width: "100%",
  height: "28px",
  borderRadius: "5px",
  border: "1px solid rgba(34, 34, 35, 0.73)",
  backgroundColor: "rgba(22, 22, 23, 0.85)",
  resize: "none",
  lineHeight: "25px",
  fontSize: "12px",
};

const kitTypeDisplayStyle = {
  width: "100%",
  height: "28px",
  borderRadius: "5px",
  fontSize: "12px",
  lineHeight: "28px",
};

const arrowButtonStyle = {
  width: "120px",
  height: "25px",
  backgroundColor: "transparent",
  color: "rgb(255, 255, 255)",
  fontSize: "16px",
  border: "none",
  cursor: "pointer",
  padding: "0px",
};

const buttonStyle = {
  position: "absolute",
  top: "0px",
  right: "10px",
  color: "white",
  fontSize: "18px",
  cursor: "pointer",
  background: "none",
  border: "none",
  transition: "none",
  padding: "5px",
};

const downloadButtonStyle = {
  backgroundColor: "transparent",
  color: "white",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  fontWeight: "200",
  padding: "2.5px 0px 0px 2.5px",
  marginLeft: "auto",
};

downloadButtonStyle["&:hover"] = {
  backgroundColor: "#4CAF50",
  border: "none",
};

const kitsContainerStyle = {
  display: "flex",
  position: "fixed",
  width: "65%",
  height: "280px",
  transform: "translateX(-50%)",
  top: "640px",
  flexDirection: "column",
  overflowX: "hidden",
  overflowY: "auto",
  scrollbarWidth: "none",
};

const dividerPartStyle = {
  backgroundColor: "#161617",
  width: "31%",
  padding: "15px",
  height: "70px",
  borderRadius: "10px",
  color: "white",
  textAlign: "center",
  cursor: "pointer",
  position: "relative",
};

const kitNumberStyle = {
  position: "absolute",
  top: "10px",
  left: "10px",
  backgroundColor: "#22222369",
  color: "#ffffffa8",
  padding: "15px",
  borderRadius: "10px",
  fontFamily: "Quicksand, sans-serif",
  fontWeight: "800",
  fontSize: "34px",
};

const kitsRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "5px",
  marginBottom: "5px",
};

const deleteButtonStyle = {
  position: "absolute",
  top: "0px",
  right: "10px",
  background: "none",
  color: "white",
  fontSize: "24px",
  border: "none",
  cursor: "pointer",
  padding: "0 5px",
};

const SettingsBlock = {
  marginBottom: "2.5px",
};

export default App;
