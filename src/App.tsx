import { useState } from "react";
import "./App.css";
import { LoginForm } from "./pages/Login";
import { RegisterForm } from "./pages/Register";
import Project from "./pages/Project";
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import { AppContext } from "./lib/AppContext";
import type { Context } from "./types";

function App() {
    const [context, setContext] = useState<Context>({
        user: null,
    });

    return (
        <Router>
            <AppContext.Provider value={context}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index path="/" element={<Home />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/project" element={<Project />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                </Routes>
            </AppContext.Provider>
        </Router>
    );
}

export default App;
