// src/components/protectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from './authProvider'

const ProtectedRoute = ({ children }) => {
    const { autenticado } = useAuth();
    
    if (!autenticado) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
