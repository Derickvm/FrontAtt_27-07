import { Link } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';
import useAuth from './useAuth';
import 'bootstrap/dist/css/bootstrap.min.css';


const MenuSuperior = () => {
    const { logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-sm" style={{ backgroundColor: '#851d86' }}>
            <div className="container">
                <div className="d-flex justify-content-between w-100">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/prestadores" className="nav-link" style={{ color: 'white' }}>
                                <strong>Cadastrar Prestador</strong>
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Dropdown>
                                <Dropdown.Toggle variant="link" id="dropdown-basic" style={{ color: 'white', textDecoration: 'none' }}>
                                    <strong>Agendamento</strong>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to="/agendamento">Agendar</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/manutencao_agendamento">Agendamentos</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                        <li className="nav-item">
                            <Link to="/usuario" className="nav-link" style={{ color: 'white' }}>
                                <strong>Cadastrar Usuário</strong>
                            </Link>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center">
                        <button
                            onClick={logout}
                            className="btn btn-danger d-flex align-items-center"
                            style={{ fontSize: '20px' }}
                        >
                            <i className="bi bi-box-arrow-right me-2"></i>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default MenuSuperior;