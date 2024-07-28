import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const FormularioLogin = () => {
    const [usuario_email, setUsuarioEmail] = useState("");
    const [usuario_senha, setUsuarioSenha] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (usuario_email.trim() === "" || usuario_senha.trim() === "") {
            setError("Preencha todos os campos!");
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usuario_email, usuario_senha })
            });

            const responseText = await response.text();
            console.log('Response status:', response.status);
            console.log('Response text:', responseText);

            if (response.ok) {
                const responseData = JSON.parse(responseText);
                const token = responseData.token;

                login(token);
                localStorage.setItem('token', token);
                navigate('/agendamento');
            } else {
                setError("Usuário ou senha inválidos!");
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError("Erro ao tentar logar. Tente novamente mais tarde.");
        }
    };

    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>

            <section className="vh-100" style={{ backgroundImage: 'url(https://static.vecteezy.com/ti/vetor-gratis/p3/3250334-abstrato-roxo-fluido-onda-fundo-gratis-vetor.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100" style={{ color: 'white' }}>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <h2 className="mb-4">Faça o Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-outline mb-4">
                                    <input
                                        type="email"
                                        id="usuario_email"
                                        className="form-control form-control-lg"
                                        value={usuario_email}
                                        onChange={(e) => {
                                            setUsuarioEmail(e.target.value);
                                            setError("");
                                        }}
                                    />
                                    <label className="form-label" htmlFor="usuario_email">Email</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input
                                        type="password"
                                        id="usuario_senha"
                                        className="form-control form-control-lg"
                                        value={usuario_senha}
                                        onChange={(e) => {
                                            setUsuarioSenha(e.target.value);
                                            setError("");
                                        }}
                                    />
                                    <label className="form-label" htmlFor="usuario_senha">Senha</label>
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}

                                <div className="d-grid gap-2 col-12 mx-auto">
                                    <button type="submit" className="btn btn-primary btn-lg btn-block">Entrar</button>
                                    <a href='http://localhost:5173/usuario' className="text-decoration-none mt-3">Ainda não possui login? Cadastre-se aqui</a>
                                    <a href='http://localhost:5173/prestadores' className="text-decoration-none mt-3">Cadastre-se como um Prestador de Serviços</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default FormularioLogin;
