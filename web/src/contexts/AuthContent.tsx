import React, { createContext, useState, useContext, useEffect } from "react";
// Importar 'type' para tipos
import type { ReactNode } from "react";
import apiClient from "../services/api";
import axios from "axios"; // Import axios para type checking de erro

// --- Início: Definições de Interfaces (substitua pelos seus imports reais se os tiver em outros arquivos) ---
// Baseado em LoginRequestDTO.java
export interface LoginRequestDTO {
  email: string;
  password?: string;
}

// Baseado em RegisterRequestDTO.java
export interface RegisterRequestDTO {
  name: string;
  email: string;
  password?: string;
}

// Baseado em ResponseDTO.java
export interface AuthResponse {
  name: string;
  token: string;
  refreshToken: string;
}
// --- Fim: Definições de Interfaces ---

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string } | null;
  token: string | null;
  login: (credentials: LoginRequestDTO) => Promise<void>;
  register: (userData: RegisterRequestDTO) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );
  // const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem('refreshToken')); // Descomente se for usar
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedName = localStorage.getItem("userName");
    if (storedToken && storedName) {
      setToken(storedToken);
      setUser({ name: storedName });
      setIsAuthenticated(true);
      apiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storedToken}`;
    }
    setIsLoading(false);
  }, []);

  const handleAuthResponse = (data: AuthResponse) => {
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("userName", data.name);
    setToken(data.token);
    // setRefreshToken(data.refreshToken); // Descomente se for usar
    setUser({ name: data.name });
    setIsAuthenticated(true);
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
  };

  const login = async (credentials: LoginRequestDTO) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post<AuthResponse>(
        "/auth/login",
        credentials
      ); //
      if (response.data.token) {
        handleAuthResponse(response.data);
      } else {
        throw new Error(
          response.data.name || "Falha no login. Verifique suas credenciais."
        ); //
      }
    } catch (error) {
      console.error("Erro no login:", error);
      logout();
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.data &&
        error.response.data.name
      ) {
        throw new Error(error.response.data.name);
      } else if (error instanceof Error) {
        throw new Error(error.message || "Erro ao tentar fazer login.");
      }
      throw new Error("Erro desconhecido ao tentar fazer login.");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterRequestDTO) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post<AuthResponse>(
        "/auth/register",
        userData
      ); //
      if (response.data.token) {
        handleAuthResponse(response.data);
      } else {
        throw new Error(response.data.name || "Falha no registro."); //
      }
    } catch (error) {
      console.error("Erro no registro:", error);
      logout();
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.data &&
        error.response.data.name
      ) {
        throw new Error(error.response.data.name);
      } else if (error instanceof Error) {
        throw new Error(error.message || "Erro ao tentar registrar.");
      }
      throw new Error("Erro desconhecido ao tentar registrar.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userName");
    setToken(null);
    // setRefreshToken(null); // Descomente se for usar
    setUser(null);
    setIsAuthenticated(false);
    delete apiClient.defaults.headers.common["Authorization"];
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        login,
        register,
        logout,
        isLoading,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
