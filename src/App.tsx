import { useState } from 'react'
import './App.css'
import { LoginForm } from './pages/login'
import { RegisterForm } from './pages/register'

function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'register'>('login')

  const showRegister = () => setCurrentPage('register')
  const showLogin = () => setCurrentPage('login')

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {currentPage === 'login' ? (
          <LoginForm onShowRegister={showRegister} />
        ) : (
          <RegisterForm onBackToLogin={showLogin} />
        )}
      </div>
    </div>
  )
}

export default App
