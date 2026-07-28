import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import type { ReactNode } from "react";

type ParItem = { id: number; nome: string; funcao: string };

type User = {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  senha_master: boolean;
  funcao: string;
  perfil: string;
  base: string;
  ativo: boolean;
  par?: ParItem[] | string;
  criadoEm: string;
  matricula:string;
};

type UserSessionType = {
  user: User | null;
  token?: string | null;
  selectedBases: string[];
  setSelectedBases: (bases: string[]) => void;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
};

const UserSession = createContext<UserSessionType | null>(null);

export function UserSessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [selectedBases, setSelectedBases] = useState<string[]>([]);
  const [token, setToken] = useState<string | null>(null); // token is kept server-side as HttpOnly cookie
  const [isLoading, setIsLoading] = useState(true);

  // On init, try to restore session by calling /api/me with credentials
  useEffect(() => {
    async function inicializar() {
      try {
        const res = await fetch("/api/me", { credentials: "include" });

        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
            setSelectedBases(
              userData.perfil === "Administrador / CISBAF"
                ? []
                : userData.base
                ? [userData.base]
                : []
            );
          } else {
            setUser(null);
            setSelectedBases([]);
            setToken(null);
          }
        } catch (error) {
          console.error("Erro ao inicializar sessão:", error);
          setUser(null);
          setSelectedBases([]);
          setToken(null);
        } finally {
          setIsLoading(false);
        }
    }

    inicializar();
  }, []);

  const login = (userData: User) => {
    // server sets HttpOnly cookie; just store user in context
    setUser(userData);
    setSelectedBases(
      userData.perfil === "Administrador / CISBAF"
        ? []
        : userData.base
        ? [userData.base]
        : []
    );
  };

  const logout = () => {
    setUser(null);
    setSelectedBases([]);
    setToken(null);
    // request server to clear cookie
    fetch("/api/logout", { method: "POST", credentials: "include" }).catch(() => {});
  };

  return (
    <UserSession.Provider value={{ user, token, selectedBases, setSelectedBases, login, logout, isLoading }}>
      {children}
    </UserSession.Provider>
  );
}

export function useUserSession() {
  const context = useContext(UserSession);

  if (!context) {
    throw new Error("useUserSession deve ser usado dentro de UserSessionProvider");
  }

  return context;
}
