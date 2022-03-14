import { FaSun, FaMoon, FaSignOutAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Header = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const changeTheme = () => {
    if (localStorage.getItem("theme")) {
      localStorage.removeItem("theme");
      document.documentElement.classList.remove("dark");
      setTheme(localStorage.getItem("theme"));
    } else {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
      setTheme(localStorage.getItem("theme"));
    }
  };

  const logoutFunc = () => {
    dispatch(logout());
  };

  return (
    <header className=" relative max-w-[540px] w-full text-white mb-[25px] md:mb-[50px] mt-[50px] px-[25px] md:p-0">
      <div className="flex justify-between items-center w-full min-w-full text-[25px] md:text-[40px] ">
        <h1 className="font-bold text-[30px] md:text-[45px] tracking-[15px] ">
          TODO
        </h1>
        <div className="flex">
          <h1
            className={theme ? "hidden" : "block cursor-pointer"}
            onClick={changeTheme}
          >
            <FaSun />
          </h1>
          <h1
            className={theme ? "block cursor-pointer" : "hidden"}
            onClick={changeTheme}
          >
            <FaMoon />
          </h1>
          <h1
            className={user ? "ml-[20px] cursor-pointer" : "hidden"}
            onClick={logoutFunc}
          >
            <FaSignOutAlt />
          </h1>
        </div>
      </div>
    </header>
  );
};
export default Header;
