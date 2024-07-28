// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

// Criação do Contexto de Autenticação
export const AuthContext = createContext(null);

// Hook customizado para acessar o AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};

// Provider que envolve a aplicação para fornecer o contexto de autenticação
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));  // Inicializa com o token do localStorage

    // Função para fazer login e armazenar o token
    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);  // Armazena o token no localStorage
    };

    // Função para fazer logout e remover o token
    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');  // Remove o token do localStorage
    };

    // Contexto com estado e funções de autenticação
    const value = {
        token,
        autenticado: !!token,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};