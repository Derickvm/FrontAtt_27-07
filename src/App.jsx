// src/App.jsx
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cadastrar_prestador from './components/cadastrar_prestador';
import FormularioLogin from './components/login';
import Cadastrar_Usuarios from './components/cadastrar_usuario';
import Agendamento from './components/agendamento';
import MenuSuperior from './components/menuSuperior';
import ProtectedRoute from './components/protectedRoute';
import {AuthProvider} from './components/authProvider';
import useAuth from './components/useAuth';
import ManutencaoAgendamento from './components/manutencao_agendamento';


const RoutesWithAuth = () => {
    const { autenticado } = useAuth();
    
    return (
        <>
            {autenticado && <MenuSuperior />}
            <Routes>
                <Route path="/login" element={autenticado ? <Navigate to="/agendamento" /> : <FormularioLogin />} />
                <Route path="/" element={autenticado ? <Navigate to="/agendamento" /> : <FormularioLogin />} />
                <Route path="/prestadores" element={
                    <ProtectedRoute>
                        <Cadastrar_prestador />
                    </ProtectedRoute>
                } />
                <Route path="/usuario" element={
                    <ProtectedRoute>
                        <Cadastrar_Usuarios />
                    </ProtectedRoute>
                } />
                <Route path="/agendamento" element={
                    <ProtectedRoute>
                        <Agendamento />
                    </ProtectedRoute>
                } />
                <Route path="/manutencao_agendamento" element={
                    <ProtectedRoute>
                        <ManutencaoAgendamento />
                    </ProtectedRoute>
                } />
                <Route path="*" element={<Navigate to="/" />} /> {/* Redireciona para a página inicial para qualquer rota não definida */}
            </Routes>
        </>
    );
};

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <RoutesWithAuth />
            </AuthProvider>
        </Router>
    );
};

export default App;
