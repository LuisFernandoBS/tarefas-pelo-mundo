import axios from "axios";
import { useEffect, useState } from "react";

interface Pais {
    nome: string;
    nomeIngles: string;
    bandeira: string;
  }

function usePaises() {
  const [paises, setPaises] = useState<Pais[]>([]);

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all?fields=name,flags,translations");
        const paisesData = response.data.map((pais: any) => {
            return {
                nome:pais.translations?.por?.common,
                nomeIngles:pais.name?.common,
                bandeira:pais.flags?.png
            };
        });
        setPaises(paisesData);
      } catch (error) {
        console.error("Erro ao buscar países:", error);
      }
    };

    fetchPaises();
  }, []);

  return paises;
    
}

export default usePaises;