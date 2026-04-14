import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Common/Navbar";
import Footer from "./Components/Common/Footer";
import HomePage from "./Components/Common/HomePage";
import Dashboard from "./Components/Dashboard";
import LoginPage from "./Components/Common/LoginPage";
import Weather from "./Components/Weather";
// im ur step- brother 
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./Components/Common/ThemeToggle";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
          <Navbar />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/weather" element={<Weather />} />
            </Routes>
          </main>

          <Footer />
          <ThemeToggle />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;