import React, { useState } from "react";
import axios from "axios";
import { saveToken } from "./auth";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:5050/api/auth/login", {
                username,
                password,
            });

            if (response.status === 200 && response.data.token) {
                saveToken(response.data.token);
                navigate("/todo");
            } else {
                setError("Token não recebido.");
            }
        } catch (err) {
            if (err.response?.status === 401) {
                setError("Usuário ou senha inválidos.");
            } else {
                setError("Erro ao conectar com o servidor.");
            }
        }
    };

    return (
        <div className="container">
            <h1>🔐 Login</h1>
            <div className="form">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Usuário"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                />
                <button onClick={handleLogin}>Entrar</button>
                {error && <p className="error">{error}</p>}
            </div>
            <p>Não tem conta? <Link to="/register">Cadastre-se</Link></p>
        </div>
    );
}

export default Login;