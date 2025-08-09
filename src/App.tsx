import "./App.css";
import { LoginForm } from "./pages/Login.tsx";
import { RegisterForm } from "./pages/Register.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import {createContext, useState} from "react";
import type {Context} from "./types";

const AppContext = createContext({
    user: null
} as Context);

function App() {
    const [context, setContext] = useState({
        user: null
    });

    return (
        <Router>
            <AppContext.Provider value={context}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                </Routes>
            </AppContext.Provider>
        </Router>
    );
}

export default App;
