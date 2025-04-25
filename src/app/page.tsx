'use client';
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import usePaises from "./service/usePaises";
import useEstados from "./service/useEstados";
import { FaTrashCan } from "react-icons/fa6";
import { FaCheckSquare } from "react-icons/fa";
import RenderClient from "./components/RenderClient";
import SelectComFiltro from "./components/SelectComFiltro";



export default function Home() {
  interface Tarefa {
    bandeira: string;
    pais: string;
    estado: string;
    descricao: string;
  }
  interface Pais {
    nome: string;
    bandeira: string;
    nomeIngles: string;
  }
  interface Estados {
    name: string;
    
  }
  const [listaTarefas, setListaTarefas] = useState<Tarefa[]>([]);
  const [listaPaises, setPaises] = useState<Pais[]>([]);
  const [listaEstados, setEstados] = useState<Estados[]>([]);
  const [paisSelecionado, setPaisSelecionado] = useState<string>("");
  const [paisSelecionadoIngles, setPaisSelecionadoIngles] = useState<string>("");
  const [estadoSelecionado, setEstadoSelecionado] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");

  const paises = usePaises();
  const estados: Estados[] = useEstados(paisSelecionadoIngles);

  useEffect(() => {
    const descricao = document.getElementById("#descricao");
    descricao?.focus();
  }, []);

  useEffect(() => {
    setPaises(paises);
  }, [paises]);

  useEffect(() => {
    if (estados.length) {
      setEstados(estados);
    }
  }, [estados]);

  useEffect(() => {
    setPaisSelecionadoIngles(paises.find((pais) => pais.nome === paisSelecionado)?.nomeIngles || "");
    setEstadoSelecionado("");
  }, [paisSelecionado]);


  const adicionarTarefa = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const novaTarefa: Tarefa = {
      pais: paisSelecionado,
      estado: estadoSelecionado,
      descricao: descricao,
      bandeira: listaPaises.find((pais) => pais.nome === paisSelecionado)?.bandeira || "",
    };

    setListaTarefas((prev) => [...prev, novaTarefa]);

    setPaisSelecionado("");
    setDescricao("");
  };

  const removerTarefa = (index: number) => {
    listaTarefas.splice(index, 1);
  };

  return (
    <div className={styles.page}>
      <div className={`${styles.painel} ${styles.cadastro}`}>
        <div className={styles['header-cadastro']}>
          <h4>Cadastro de tarefas</h4>
        </div>
        <div className={styles['corpo-cadastro']}>
          <form onSubmit={adicionarTarefa}>
            <div className={styles['div-campos']}>
              <div className={styles['form-group']}>
                <label htmlFor="pais">País</label>
                <RenderClient>
                  <SelectComFiltro
                    id="pais"
                    opcoes={listaPaises.map((pais) => pais.nome)}
                    valor={paisSelecionado}
                    setValor={setPaisSelecionado}
                  />
                </RenderClient>
              </div>
              <div className={styles['form-group']}>
                <label htmlFor="pais">Estado</label>
                <RenderClient>
                  <SelectComFiltro
                    id="estado"
                    opcoes={listaEstados.map((estado) => estado.name)}
                    disabled={!paisSelecionadoIngles}
                    valor={estadoSelecionado}
                    setValor={setEstadoSelecionado}
                  />
                </RenderClient>
              </div>
              <div className={styles['form-group']}>
                <label htmlFor="descricao">Descrição</label>
                <textarea 
                  id="descricao" 
                  name="descricao" 
                  rows={8}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </div>
            </div>
            <div className={styles['div-btn']}>
              <button type="submit">Cadastrar</button>
            </div>
          </form>
        </div>
      </div>
      <div className={`${styles.painel} ${styles.lista}`}>
        <div className={styles['header-lista']}>
          <h4>Lista de tarefas</h4>
        </div>
        <div className={styles['corpo-lista']}>
          {listaTarefas.map((tarefa, index) => (
            <div key={index} className={styles.tarefa}>
              <div className={styles.linha}>
                <img className={styles['tarefa-imagem']} src={tarefa.bandeira} alt="Bandeira" />
                <div className={styles['tarefa-pais-estado']}>
                  <strong>{tarefa.pais}</strong> - {tarefa.estado}
                </div>
              </div>
              <div className={styles.linha}>
                <div className={styles['tarefa-descricao']}>
                  {tarefa.descricao}
                </div>
                <div className={styles['tarefa-botao']}>
                  <FaTrashCan className={styles['icone-deletar']} />
                  <FaCheckSquare className={styles['icone-finalizar']}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
