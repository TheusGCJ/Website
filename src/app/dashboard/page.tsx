"use client";
import{ useState, useEffect } from "react";
import styles from"./dashboard.module.css";

interface Condominio {
    
    id: number;
    nome: string;
    moradores: number;
    cidade:string;
}

export default function dashboardPage(){
    const [condominios, setCondominios] = useState<Condominio[]>([]);

    // Simula buscar do backend (futuro)
    useEffect(() => {
        // Aqui futuramente vai vir o fetch para API
        const dadosFake = [
            { id: 1, nome: "Condomínio 1", moradores: 340, cidade: "Brasília - DF"},
            { id: 2, nome: "Condomínio 2", moradores: 852, cidade: "Brasília - DF"},
            { id: 3, nome: "Condomínio 3", moradores: 706, cidade: "Brasília - DF"},
            { id: 4, nome: "Condomínio 4", moradores: 105, cidade: "Brasília - DF"}
        ];
            setCondominios(dadosFake);
    }, []);

    const [user] = useState ({
        nome: "admin",
        email:"admin@gmail.com",
    });

    return(
        //siderBar
        <div className={styles.container}>
                 {/* Header */}
                 <header className= {styles.header}>
                    <h1 className={styles.logo}>Atlas</h1>
                   <div className={styles.userarena}>
                        <h1 className={styles.bv}>Bem-vindo, {user.nome}</h1>
                        <button className={styles.sairbtn}>Sair</button>
                   </div>
                 </header>
     
    <div className={styles.content}>
        <aside className={styles.sidebar}>
        <nav>
            <a href="#">Licenças</a>
            <a href="#">Controle de acessos</a>
            <a href="#">Cadastros</a>
            <a href="#">Boletos</a>
            <a href="#">Documentos</a>
            <a href="#">Configurações</a>
        </nav>
        </aside>
          {/* Seus Condomínios*/}
        <main className={styles.main}>
            <div className={styles.topbar}>
            <h2>Licenças</h2>
            <button className={styles.addbtn}>+ Nova</button>
            </div>

            <input 
            type="text"
            placeholder="Pesquise o nome ou código do condomínio"
            className={styles.buscar} 
             />
                <div className={styles.cardgrid}>
                    {condominios.map ((cond) => (
                        <div key={cond.id}  className={styles.card}>
                            <h3>{cond.nome}</h3>
                            <p><b>Condomínios</b></p>
                            <p>{cond.moradores} moradores</p>
                            <p className="cidade">{cond.cidade}</p>
                        </div>
                    ))}
                </div>
        </main>
    </div>
</div>
  );
} 