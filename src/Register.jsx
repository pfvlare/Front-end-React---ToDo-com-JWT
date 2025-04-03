import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                username,
                password,
            });
            setMsg("Cadastro feito com sucesso!");
            setTimeout(() => navigate("/"), 1500);
        } catch (err) {
            setMsg("Erro ao registrar. Tente outro nome.");
        }
    };

    return (
        <div className="container">
            <h1>📝 Cadastro</h1>
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
                <button onClick={handleRegister}>Cadastrar</button>
            </div>
            <p>Já tem conta? <Link to="/">Entrar</Link></p>
            {msg && <p>{msg}</p>}
        </div>
    );
}

export default Register;