import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Register from "./views/Register";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import Background from "./components/Background";
import Header from "./components/Header";

function App() {
  // Set Theme
  useEffect(() => {
    if (localStorage.getItem("theme")) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <>
      <Router>
        <div className="flex flex-col justify-center items-center max-w-screen overflow-hidden min-h-screen bg-very_light_gray dark:bg-very_dark_blue">
          <Background />
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
