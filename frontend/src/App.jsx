import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./views/Register";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import Background from "./components/Background";
import { useEffect } from "react";

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
        <div className="flex justify-center items-center w-screen min-h-screen bg-very_light_gray dark:bg-very_dark_blue">
          <Background />
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
