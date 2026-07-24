import { NavLink, useNavigate } from "react-router";
import { useUserSession } from "../contexts/UserSession";
import { useEffect, useState } from "react";
import { useAuthFetch } from "../hooks/useAuthFetch";


import { 
    ChartPie, 
    Download,
    MonitorCog 
} 

from "lucide-react";
type Ficha = {
    nome: string;
    link: string;
    icon: string;
};

type Base = {
  id: number;
  nome: string;
  cor: string;
};


export default function Nav() {

    const navigate = useNavigate();
    const { logout, selectedBases, setSelectedBases, user, isLoading } = useUserSession();
    const [fichas, setFichas] = useState<Ficha[]>([]);
    const [bases, setBases] = useState<Base[]>([]);
const [filtroAberto, setFiltroAberto] = useState(false);
    useEffect(() => {
    if (!user && !isLoading) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };


    const fichasVisiveis =
    user?.perfil === "Colaborador"
        ? fichas.filter(
            (ficha) =>
                ficha.nome === user.funcao ||
                ficha.nome === "Liderado > Liderança" ||
                ficha.nome === "Simulação bp-TEAM" ||
                ficha.nome === "Avaliação dos Pares"

        )
        : user?.perfil === "Coordenador de Base"
        ? fichas.filter(
            (ficha) =>
            ficha.nome === user.funcao ||
            ficha.nome === "Simulação bp-TEAM" ||
            ficha.nome === "Avaliação dos Pares" ||
            ficha.nome === "Liderança > Liderado"
        )
        : fichas;

    

    const { authFetch } = useAuthFetch();

    useEffect(() => {
        authFetch("/api/fichas")
            .then((res) => res.json())
            .then((data) => setFichas(data));
    }, []);

  const carregar = async (url: string, setter: Function) => {
      try {
          const res = await fetch(url);
          const data = await res.json();
          setter(data);
      } catch (err) {
          console.error(err);
      }
  };

  useEffect(() => {
    carregar("/api/bases", setBases);
  }, []);


    return (
        
        <aside className="bg-[#0a1a30] lg:flex w-64 flex-col text-white shrink-0 border-r border-sidebar-border">
            <div className="flex flex-col h-full">

                <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
                    <div className="w-10 h-10 rounded-xl bg-[#cd0048] flex items-center justify-center shrink-0">
                        <span className="text-white font-bold text-sm">192</span>
                    </div>
                    <div>
                        <p className="font-bold text-sm leading-tight">SAMU 192</p>
                        <p className="60 text-xs">CRUR-BF / CISBAF</p>
                    </div>
                </div>

               {user?.perfil === "Administrador / CISBAF" && (
                    <div className="px-4 py-2.5 border-b border-sidebar-border">
                        <button
                            type="button"
                            onClick={() => setFiltroAberto((prev) => !prev)}
                            className="w-full flex items-center justify-between group"
                        >
                            <p className="text-[11px] uppercase tracking-wider font-semibold text-[#cbd5e1] flex items-center gap-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                                Filtrar bases
                                {selectedBases.length > 0 && (
                                    <span className="ml-1 px-1.5 py-0.5 rounded-full bg-[#cd0048] text-white text-[9px] leading-none">
                                        {selectedBases.length}
                                    </span>
                                )}
                            </p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={`text-[#cbd5e1] transition-transform duration-200 group-hover:text-white ${
                                    filtroAberto ? "rotate-180" : ""
                                }`}
                            >
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </button>

                        <div
    className={`overflow-hidden transition-all duration-200 ease-in-out ${
        filtroAberto ? "max-h-32 opacity-100 mt-2" : "max-h-0 opacity-0"
    }`}
>
    <div className="flex flex-wrap gap-1.5 pb-1 max-h-28 overflow-y-auto custom-scrollbar pr-1">
        <button
            type="button"
            onClick={() => setSelectedBases([])}
            className={`px-2.5 py-1 rounded-full text-[10px] font-medium border transition-all duration-150 ${
                selectedBases.length === 0
                    ? "bg-[#cd0048] border-[#cd0048] text-white shadow-sm shadow-[#cd0048]/30"
                    : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20 hover:text-white"
            }`}
        >
            Todas
        </button>
        {bases.map((baseOption) => {
            const ativo = selectedBases.includes(baseOption.nome);
            return (
                <button
                    key={baseOption.id}
                    type="button"
                    onClick={() => {
                        if (ativo) {
                            setSelectedBases(
                                selectedBases.filter((name) => name !== baseOption.nome)
                            );
                        } else {
                            setSelectedBases([...selectedBases, baseOption.nome]);
                        }
                    }}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border transition-all duration-150 ${
                        ativo
                            ? "bg-[#cd0048] border-[#cd0048] text-white shadow-sm shadow-[#cd0048]/30"
                            : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20 hover:text-white"
                    }`}
                >
                    <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: baseOption.cor || "#cbd5e1" }}
                    />
                    {baseOption.nome}
                </button>
            );
        })}
    </div>
</div>
                    </div>
                )}
                

                <nav className="custom-scrollbar flex-1 overflow-y-auto px-3 py-2 space-y-0.5 text-left">
                    <NavLink to="/" 
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                            isActive
                                ? "bg-[#cd0048]/20 text-[#cd0048] border-l-4 border-[#cd0048]"
                                : "70 hover:bg-[#cd0048]/20"
                        }`
                    }>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>
                        Inicio
                    </NavLink>
                    
                    {user?.perfil !== "Colaborador" && (
                        <NavLink to="/painel-kpis" className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                                isActive
                                    ? "bg-[#cd0048]/20 text-[#cd0048] border-l-4 border-[#cd0048]"
                                    : "70 hover:bg-[#cd0048]/20"
                            }`
                        }>
                            <ChartPie />
                            Painel de KPIs
                        </NavLink>
                    )}

                    {user?.perfil !== "Colaborador" && (
                        <NavLink to="/baixarFicha" className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                                isActive
                                    ? "bg-[#cd0048]/20 text-[#cd0048] border-l-4 border-[#cd0048]"
                                    : "70 hover:bg-[#cd0048]/20"
                            }`
                        }>
                            <Download /> Baixar Fichas (PDF)
                        </NavLink>
                    )}
                    <NavLink to="/instrucao" />
                    <NavLink to="/ajuda"
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                          isActive
                            ? "bg-[#cd0048]/20 text-[#cd0048] border-l-4 border-[#cd0048]"
                            : "70 hover:bg-[#cd0048]/20"
                        }`
                      }
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 1 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12" y2="17"></line></svg>
                      Ajuda
                    </NavLink>
                    <NavLink to="/instrucao"
                    
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                            isActive
                                ? "bg-[#cd0048]/20 text-[#cd0048] border-l-4 border-[#cd0048]"
                                : "70 hover:bg-[#cd0048]/20"
                        }`
                    }>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 7v14"></path><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path></svg>
                        Como Avaliar
                    </NavLink>
                    

                    <div className='pt-3 pb-1'>
                        <p className='px-3 text-[12px] font-semibold 40 uppercase tracking-wider mb-1'>
                            Fichas de Avaliação
                        </p>
                        {fichasVisiveis.map((ficha) => (
                            <NavLink
                                key={ficha.nome}
                                to={ficha.link}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 ml-1 ${
                                        isActive
                                            ? "bg-[#cd0048]/20 text-[#cd0048]"
                                            : "70 hover:bg-[#cd0048]/20"
                                    }`
                                }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="m9 18 6-6-6-6"></path>
                                </svg>
                                {ficha.icon} {ficha.nome}
                            </NavLink>
                        ))}
                        
                    </div>

                    <div className='pt-3 pb-1'>
                        <p className='px-3 text-[12px] font-semibold 40 uppercase tracking-wider mb-1'>
                            Ferramentas
                        </p>
                        <NavLink to="/Autoavaliacao" 
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                                isActive
                                    ? "bg-[#cd0048]/20 text-[#cd0048] border-l-4 border-[#cd0048]"
                                    : "70 hover:bg-[#cd0048]/20"
                            }`
                        }>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>
                            Autoavaliação
                        </NavLink>

                        {user?.perfil !== "Colaborador" && (
                            <NavLink to="/plano-desenvolvimento" 
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                                        isActive
                                            ? "bg-[#cd0048]/20 text-[#cd0048] border-l-4 border-[#cd0048]"
                                            : "70 hover:bg-[#cd0048]/20"
                                    }`
                                }>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>
                                Plano de Desenvolvimento
                            </NavLink>
                        )}

                        {user?.perfil !== "Colaborador" && (
                            <NavLink to="/cadastro" 
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                                        isActive
                                            ? "bg-[#cd0048]/20 text-[#cd0048] border-l-4 border-[#cd0048]"
                                            : "70 hover:bg-[#cd0048]/20"
                                    }`
                                }>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                Cadastro de Profissionais
                            </NavLink>
                        )}
                        
                        {user?.perfil !== "Colaborador" && user?.perfil !== "Coordenador de Base" && (
                            <NavLink to="/configuracoes" 
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                                        isActive
                                            ? "bg-[#cd0048]/20 text-[#cd0048] border-l-4 border-[#cd0048]"
                                            : "70 hover:bg-[#cd0048]/20"
                                    }`
                                }>
                                <MonitorCog />
                                Configurações
                            </NavLink>
                        )}
                    </div>
                </nav>
                <div className='px-4 py-3 border-t border-sidebar-border'>
                    <button onClick={handleLogout} className='w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium 60 hover:bg-destructive/20 hover:text-destructive transition-colors'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg>
                        Sair
                    </button>
                    <p className='30 text-[10px] mt-2 leading-relaxed px-1'>bp-TEAM · NTS · Portaria MS 2.048/2002</p>
                </div>
            </div>
        </aside>
    )
}