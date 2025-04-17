'use client';
import React, { useState, useEffect } from "react";

interface SelectComFiltroProps {
  opcoes: string[];
  id: string;
  valor: string;
  setValor: (valor: string) => void;
}

const SelectComFiltro: React.FC<SelectComFiltroProps> = ({ opcoes, id, valor, setValor }) => {
  const [filtro, setFiltro] = useState<string>("");
  const [opcoesFiltradas, setOpcoesFiltradas] = useState<string[]>(opcoes);
  const [mostrarBox, setMostrarBox] = useState<string>("");
  
  useEffect(() => {
    if (filtro.trim() === "") {
      setOpcoesFiltradas(opcoes);
    } else {
      setOpcoesFiltradas(
        opcoes.filter((opcao) =>
          opcao.toLowerCase().includes(filtro.toLowerCase())
        )
      );
      if (opcoesFiltradas.length = 1) {
        setValor(opcoesFiltradas[0]);
      }
    }
  }, [filtro, opcoes]);

  return (
    <div style={{ position: "relative"}}>
      <input
        id={id}
        type="text"
        value={filtro}
        onFocus={() => setMostrarBox("block")}
        onBlur={() => {
          setTimeout(() => setMostrarBox("none"), 150);
        }}
        onChange={(e) => setFiltro(e.target.value)}
        placeholder="Filtrar..."
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "4px",
        }}
      />
      <div
        style={{
          width: "100%",
          borderRadius: "4px",
          border: "1px solid #ccc",
          display: mostrarBox,
          zIndex: 1,
          position: "absolute",
          backgroundColor: "#fff",
          maxHeight: "150px",
          overflowY: "auto",
        }}
      >
        {opcoesFiltradas.map((opcao, index) => (
          <div
            key={index}
            onClick={() => setFiltro(opcao)}
            style={{
              padding: "8px",
              cursor: "pointer",
              borderBottom: "1px solid #eee",
            }}
          >
          {opcao}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectComFiltro;
