'use client';
import React, { useRef, useState, useEffect } from "react";

interface SelectComFiltroProps {
  opcoes: string[];
  id: string;
  valor: string;
  setValor: (valor: string) => void;
  disabled?: boolean;
}

interface Width {
  [key: string]: string | number;
}

const SelectComFiltro: React.FC<SelectComFiltroProps> = ({ opcoes, id, valor, setValor,disabled }) => {
  const [filtro, setFiltro] = useState<string>("");
  const [valorSelecionado, setValorSelecionado] = useState<string>("");
  const [opcoesFiltradas, setOpcoesFiltradas] = useState<string[]>(opcoes);
  const [mostrarBox, setMostrarBox] = useState<string>("none");
  const [larguraInputFiltro, setLarguraInputFiltro] = useState<Width>({ width: "1%" });

  const inputRef = useRef<HTMLInputElement>(null);
  const inputFiltroRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    atualizarLarguraInputFiltro();
    
    window.addEventListener("resize", atualizarLarguraInputFiltro);

    return () => {
      window.removeEventListener("resize", atualizarLarguraInputFiltro);
    };
  }, []);

  useEffect(() => {
    setValorSelecionado(valor || "");
  }, [valor]);

  useEffect(() => {
    setValor(valorSelecionado);
  }, [valorSelecionado]);

  useEffect(() => {
    if (filtro.trim() === "") {
      setOpcoesFiltradas(opcoes);
    } else {
      setOpcoesFiltradas(
        opcoes.filter((opcao) =>
          opcao.toLowerCase().includes(filtro.toLowerCase())
        )
      );
    }
    atualizarLarguraInputFiltro();
  }, [filtro, opcoes]);

  useEffect(() => {
    setTimeout(() => setMostrarBox("none"), 150);
  }, [valorSelecionado]);

  function atualizarLarguraInputFiltro() {
    if (inputRef.current) {
      const { width } = inputRef.current.getBoundingClientRect();
      let overflow = 0;
      if (opcoesFiltradas.length >= 4) {
        overflow = 17; 
      }
      const larguraComMargem = `${width - overflow}px`;
      setLarguraInputFiltro({width: larguraComMargem});        
    }
  }

  return (
    <div style={{ position: "relative"}}>
      <input
        id={id}
        ref={inputRef}
        type="text"
        value={valorSelecionado}
        readOnly={true}
        disabled={disabled}
        onClick={() => {
          setMostrarBox("block");
          setTimeout(() => inputFiltroRef.current?.focus(), 150);       
        }}
        placeholder="Selecione uma opção"
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
        <input
          ref={inputFiltroRef}
          type="text"
          value={filtro}
          disabled={disabled}
          onBlur={() => {
            setTimeout(() => setMostrarBox("none"), 150);          
          }}
          onChange={(e) => setFiltro(e.target.value)}
          placeholder="Filtrar..."
          style={{
            width: larguraInputFiltro.width,
            position: "fixed",
            padding: "8px",
            borderRadius: "0px",
          }}
        />
        {opcoesFiltradas.map((opcao, index) => (
          <div
            key={index}
            onClick={() => setValorSelecionado(opcao)}
            style={{
              padding: "8px",
              cursor: "pointer",
              borderBottom: "1px solid #eee",
              marginTop: index === 0 ? "37px" : "0",
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
