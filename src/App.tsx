import "./App.css";
import { LoginForm } from "./pages/Login.tsx";
import { RegisterForm } from "./pages/Register.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="w-full max-w-4xl">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegisterForm />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
