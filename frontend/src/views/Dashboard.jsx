import { useEffect, useState } from "react";

const Dashboard = () => {
  const changeTheme = () => {
    if (localStorage.getItem("theme")) {
      localStorage.removeItem("theme");
      document.documentElement.classList.remove("dark");
    } else {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <div className="relative">
      <button onClick={changeTheme}>Change theme</button>
    </div>
  );
};
export default Dashboard;
