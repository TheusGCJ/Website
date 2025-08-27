"use client";
import{ useState, useEffect } from "react";
import styles from"./dashboard.module.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Link from "next/link";

interface Condominio {
    
    id: number;
    nome: string;
    moradores: number;
    cidade:string;
}

interface Menu{
    nome: string;
    pagina?: string;
    submenus?: Submenu[];
}

interface Submenu{
    nome:string;
    pagina: string;
}

interface DashboardHomeProps{
    condominios: Condominio[];
}

export default function DashboardHome(){
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

    const [menuAberto, setMenuAberto] = useState<string | null>(null);

    const [paginaAtual, setPaginaAtual] = useState<string>("dashboard")

    const menus: Menu[] =[
        {
            nome:"Licenças",
            pagina:"dashboard"
        },
        {
            nome:"Controle de acessos",
           pagina:"acessos-pessoas"
        },
        { nome:"Novo cadastro", pagina:"novo-cadastro"},
        {
            nome:"Boletos",
            submenus:[
                {nome:"Emitir Boleto", pagina:"boletos-emitir"}, 
                {nome:"Histórico", pagina:"boletos-historico"}
            ],
        },
        {
            nome:"Documentos",
            submenus:[
                {nome:"Contratos", pagina:"documentos-contratos"}, 
                {nome:"Relatórios", pagina:"documentos-relatorios"},
            ],
        },
        {
            nome:"configurações",
            submenus:[
                {nome:"Usuários", pagina:"configuracoes-usuarios"},
                {nome:"Sistema",  pagina:"configuracoes-sistema"},
            ],
        }, 
    ];
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
                 {menus.map((menu) => (
                <div key={menu.nome}>
                    {menu.submenus ? (
                    <>
                        <button
                        className={styles.menubtn}
                        onClick={() => {
                            if (menu.nome ==="Licenças") {
                                setPaginaAtual("dashboar");
                            }
                                setMenuAberto(menuAberto === menu.nome ? null : menu.nome);    
                        }}
                        >
                        {menu.nome}{" "}
                        {menuAberto === menu.nome ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                        {menuAberto === menu.nome && (
                        <div className={styles.submenu}>
                            {menu.submenus.map((sub, i) => (
                            <button
                             key={i} 
                             className={styles.subbtn}
                             onClick={() => setPaginaAtual(sub.pagina)}
                            >
                            {sub.nome}  
                            </button>
                            ))}
                        </div>
                        )}
                    </>
                    ) : (
                    <button
                    className={styles.menubtn}
                    onClick={() => setPaginaAtual(menu.pagina || "dashboard")}
                    >
                        {menu.nome}
                    </button>
                    )}
                </div>
                ))}
          </nav>
        </aside>
          {/* Seus Condomínios*/}
        <main className={styles.main}>
        {paginaAtual === "dashboard" && ( 
            <>
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
                </>
                )}
                {paginaAtual === "licencas-nova" &&(
                    <h2> Criar nova licenças</h2>
                )}
                {paginaAtual === "acessos-pessoas" &&(
                    <h2> Controle de Acesso</h2>
                )}
                {paginaAtual === "acessos-veiculos" &&(
                    <h2> Controle de Veiculos</h2>
                )}
                {paginaAtual === "acessos-unidades" &&(
                    <h2> Controle de Unidades</h2>
                )}
                {paginaAtual === "novo-cadastro" &&(
                    <h2> Novo Cadastro</h2>
                )}  
                {paginaAtual === "boletos-emitir" &&(
                    <h2> Emitir Boletos</h2>
                )}
                {paginaAtual === "boletos-historico" &&(
                    <h2> Historico de Boletos</h2>
                )}
                {paginaAtual === "documentos-contratos" &&(
                    <h2> Contratos</h2>
                )}
                {paginaAtual === "documentos-relatorios" &&(
                    <h2> Relatórios</h2>
                )}
                {paginaAtual === "configuracoes-usuarios" &&(
                    <h2> Gerenciar Usuários</h2>
                )}
                {paginaAtual === "configuracoes-sistema" &&(
                    <h2> Configurações do Sistema</h2>
                )}
        </main>
    </div>
</div>
  );
} 