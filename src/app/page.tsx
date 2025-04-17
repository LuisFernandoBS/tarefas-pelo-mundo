'use client';
import styles from "./page.module.css";
import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { FaCheckSquare } from "react-icons/fa";
import RenderClient from "./components/RenderClient";
import SelectComFiltro from "./components/SelectComFiltro";



export default function Home() {
  interface Tarefa {
    pais: string;
    descricao: string;
  }
  const [listaTarefas, setListaTarefas] = useState<Tarefa[]>([]);
  const [paisSelecionado, setPaisSelecionado] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");

  const adicionarTarefa = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const novaTarefa: Tarefa = {
      pais: paisSelecionado,
      descricao: descricao,
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
                    opcoes={[
                      'Brasil',
                      'Argentina',
                      'Chile',
                      'Uruguai',
                      'Paraguai',
                      'Bolívia',
                      'Peru',
                      'Colômbia',
                      'Venezuela',
                    ]}
                    valor={paisSelecionado}
                    setValor={setPaisSelecionado}
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
                <div className={styles['tarefa-pais']}>{tarefa.pais}</div>
              </div>
              <div className={styles.linha}>
                <div className={styles['tarefa-descricao']}>
                  {tarefa.descricao}
                </div>
                <div className={styles['tarefa-botao']}>
                  <FaTrashCan className={styles['icone-deletar']} />
                  <FaCheckSquare className={styles['icone-finalizar']} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
