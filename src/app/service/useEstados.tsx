import axios from "axios";
import { useEffect, useState } from "react";


function useEstados(pais:string) {
  const [estados, setEstados] = useState<any[]>([]);

  useEffect(() => {
    if (!pais) return;

    const fetchEstado = async () => {
      try {
        const response = await axios.post("https://countriesnow.space/api/v0.1/countries/states",{country:pais});
        const estadosData = response.data;
        if (!estadosData.error) {
          let listaEstados = estadosData?.data?.states?.map((estado: any) => {
              return estado;
          }) || [];
          setEstados(listaEstados);
        }
      } catch (error) {
        console.error("Erro ao buscar estados:", error);
      }
    };

    fetchEstado();
  }, [pais]);

  return estados;
}

export default useEstados;