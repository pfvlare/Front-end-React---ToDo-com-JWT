import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { getToken, removeToken } from "./auth";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5050/api/todo";

function Todo() {
    const [tasks, setTasks] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const navigate = useNavigate();

    const headers = {
        Authorization: `Bearer ${getToken()}`,
    };

    // ✅ Função memoizada para evitar warning no useEffect
    const loadTasks = useCallback(async () => {
        try {
            const res = await axios.get(API_URL, { headers });
            setTasks(res.data);
        } catch (err) {
            if (err.response?.status === 401) {
                removeToken();
                navigate("/");
            }
        }
    }, [headers, navigate]);

    const addTask = async () => {
        if (!newTitle) return;
        await axios.post(API_URL, { title: newTitle, isDone: false }, { headers });
        setNewTitle("");
        loadTasks();
    };

    const toggleTask = async (task) => {
        await axios.put(`${API_URL}/${task.id}`, { ...task, isDone: !task.isDone }, { headers });
        loadTasks();
    };

    const deleteTask = async (id) => {
        await axios.delete(`${API_URL}/${id}`, { headers });
        loadTasks();
    };

    const logout = () => {
        removeToken();
        navigate("/");
    };

    // ✅ useEffect com dependência de função segura
    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    return (
        <div className="container">
            <h1>📋 Minhas Tarefas</h1>
            <button onClick={logout}>Sair</button>

            <div className="input-group">
                <input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Nova tarefa"
                />
                <button onClick={addTask}>Adicionar</button>
            </div>

            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task.id} className={task.isDone ? "done" : ""}>
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={() => toggleTask(task)}
                        />
                        <span>{task.title}</span>
                        <button onClick={() => deleteTask(task.id)}>🗑️</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todo;