"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from "./dashboard.module.css";

interface Condominio {
  id: number;
  nome: string;
  moradores: number;
  cidade: string;
}

interface Submenu {
  nome: string;
  pagina: string;
  link?: string;
}

interface Menu {
  nome: string;
  pagina?: string;
  link?: string;
  submenus?: Submenu[];
}

export default function DashboardHome() {
  const [condominios, setCondominios] = useState<Condominio[]>([]);
  const [menuAberto, setMenuAberto] = useState<string | null>(null);
  const [paginaAtual, setPaginaAtual] = useState<string>("dashboard");
  const [condominioSelecionado, setCondominioSelecionado] = useState<Condominio | null>(null);

  const user = {
    nome: "admin",
    email: "admin@gmail.com",
  };

  // Simula busca de backend
  useEffect(() => {
    const dadosFake: Condominio[] = [
      { id: 1, nome: "Condomínio 1", moradores: 340, cidade: "Brasília - DF" },
      { id: 2, nome: "Condomínio 2", moradores: 852, cidade: "Brasília - DF" },
      { id: 3, nome: "Condomínio 3", moradores: 706, cidade: "Brasília - DF" },
      { id: 4, nome: "Condomínio 4", moradores: 105, cidade: "Brasília - DF" },
    ];
    setCondominios(dadosFake);
  }, []);

  const menus: Menu[] = [
    { nome: "Licenças", pagina: "licencas", link: "/licencas" },
    { nome: "Controle de acessos", pagina: "controledeacesso", link: "/controledeacesso" },
    {
      nome: "Boletos",
      submenus: [
        { nome: "Emitir", pagina: "boletos-emitir", link: "/boletos/emitir" },
        { nome: "Histórico", pagina: "boletos-historico", link: "/boletos/historico" },
      ],
    },
    {
      nome: "Documentos",
      submenus: [
        { nome: "Regulamento", pagina: "documentos-contratos", link: "/documentos/contratos" },
        { nome: "Comunicados", pagina: "documentos-relatorios", link: "/documentos/relatorios" },
      ],
    },
    { nome: "Configurações", pagina: "configuracoes-usuarios", link: "/configuracoes" },
  ];

  const renderMenu = (menu: Menu) => {
    if (menu.submenus) {
      return (
        <>
          <button
            className={styles.menubtn}
            onClick={() => setMenuAberto(menuAberto === menu.nome ? null : menu.nome)}
          >
            {menu.nome} {menuAberto === menu.nome ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          <div className={`${styles.submenu} ${menuAberto === menu.nome ? styles.open : ""}`}>
            {menu.submenus.map((sub) => (
              <div key={sub.nome} className={styles.submenuitem}>
                <button onClick={() => setPaginaAtual(sub.pagina)}>{sub.nome}</button>
              </div>
            ))}
          </div>
        </>
      );
    }

    return (
      <div className={styles.menuiteminline}>
        <button
          className={styles.menubtn}
          onClick={() => setPaginaAtual(menu.pagina || "dashboard")}
        >
          {menu.nome}
        </button>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.logo}>Atlas</h1>
        <div className={styles.userarena}>
          <h1 className={styles.bv}>Bem-vindo, {user.nome}</h1>
          <button className={styles.sairbtn}>Sair</button>
        </div>
      </header>

      <div className={styles.content}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <nav>
            {menus.map((menu) => (
              <div key={menu.nome} className={styles.menuitem}>
                {renderMenu(menu)}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className={styles.main}>
          {paginaAtual === "dashboard" && !condominioSelecionado && (
            <>
              <div className={styles.topbar}>
                <h2>Condomínios</h2>
                <button className={styles.addbtn}>+ Nova</button>
              </div>
              <input
                type="text"
                placeholder="Pesquise o nome ou código da licença"
                className={styles.buscar}
              />
              <div className={styles.cardgrid}>
              {condominios.map((cond) => (
                <Link className={styles.cardlink} key={cond.id} href={`/condominios/${cond.id}`}>
                    <div className={styles.card}>
                        <h3>{cond.nome}</h3>
                        <p>{cond.moradores} moradores</p>
                    </div>
                </Link>
                ))}
              </div>
            </>
          )}

          {condominioSelecionado && (
            <div className={styles.condominiodetalhes}>
              <h2>{condominioSelecionado.nome}</h2>
              <p>Cidade: {condominioSelecionado.cidade}</p>
              <p>Moradores: {condominioSelecionado.moradores}</p>
              <button onClick={() => setCondominioSelecionado(null)}>Voltar</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}