import { useState } from "react";
import { LoginForm } from "./pages/Login";
import { RegisterForm } from "./pages/Register";
import Project from "./pages/Project";
import ProjectDetail from "./pages/ProjectDetail";
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import { AppContext } from "./lib/AppContext";
import type { Context } from "./types";

function App() {
    const [context, setContext] = useState<Context>({
        user: null,
        fetchApi: async (endpoint: `/${string}`): Promise<Response> => {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No token found");
            }

            return fetch(`https://my-future-backend.onrender.com${endpoint}`, {
                headers: {
                    Cookie: `token=${token}`
                }
            });
        },
        fetchApiPublic: async (endpoint: `/${string}`): Promise<Response> => {
            return fetch(`https://my-future-backend.onrender.com${endpoint}`);
        }
    });

    return (
        <Router>
            <AppContext.Provider value={context}>
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="project" element={<Project />} />
                        <Route
                            path="/project/:id"
                            element={<ProjectDetail />}
                        />
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                </Routes>
            </AppContext.Provider>
        </Router>
    );
}

export default App;
