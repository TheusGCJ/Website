"use client";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react"
import styles from "./condominios.module.css"

const abas = ["Unidades","Dados cadastrais", "Recursos", "Equipamentos", "Relatorios"];

export default function CondominiosPage(){
    const {id} = useParams();
    const[abaAtiva, setAbaAtiva] = useState("Unidades");
    
        const blocos = [
                {nome: "Bloco A", unidades:48, moradores: 82},
                {nome: "Bloco B", unidades:48, moradores: 32},
                {nome: "Bloco C", unidades:48, moradores: 49},
                {nome: "Bloco D", unidades:48, moradores: 50}
            ];

    return(
        <div className={styles.content}>
            <div className={styles.header}>
                <h1>condomínio {id}</h1>
            </div>

                {/* Menu de abbas */}
           <nav className={styles.tabs}>
            {abas.map((aba) => (
                <button
                key={aba}
                className={`${styles.tab} ${abaAtiva === aba ? styles.active: ""}`} onClick={() => setAbaAtiva(aba)}>
                    {aba}
                </button>
            ))}
           </nav>
            {/* Conteúdo da aba */}
           {abaAtiva === "Unidades" && (
            <div className={styles.grid}>
                <input type="text"
            placeholder="Pesquise um(a) bloco..."  className={styles.buscar}/>
             <div className={styles.btn}>
                 <button className={styles.incluir}>
                    Incluir bloco
                  </button>
                  <button className={styles.importa}>
                    Importa cadastro
                  </button>
             </div>
                {blocos.map((bloco, i) => (
                    <div key={i} className={styles.card}>
                        <h2>{bloco.nome}</h2>
                        <p>{bloco.unidades} unidades</p>
                        <p>{bloco.moradores} moradores</p>
                    </div>
                ))}
            </div>
           )}

           {abaAtiva === "Dados cadastrais" && <p>Exibbir dados cadastrais aqui...</p> }
           {abaAtiva === "Recursos" && <p>Exibir recursos aqui...</p> },
           {abaAtiva === "Equipamentos" && <p>Exibir equipamentos aqui...</p> },
           {abaAtiva === "Relatorios" && <p>Exibir Relatórios aqui...</p> }
        </div>
    );
}
    