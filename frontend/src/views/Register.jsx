import { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../features/auth/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispath = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.auth
  );

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    if (userData && formData.password === formData.confirmPassword) {
      dispath(register(userData));
      dispath(reset);
    } else {
      alert("Please check all parameters");
    }
  };

  const navigateLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/");
    }

    if (isError) {
      console.log(message);
    }

    if (localStorage.getItem("theme")) {
      document.documentElement.classList.add("dark");
    }
  }, [user, isError, isSuccess, isLoading, message, dispath, navigate]);

  return (
    <div className="relative flex flex-col justify-center items-center w-screen px-[20px] pt-[20px] pb-[50px] text-center">
      <div className="max-w-[540px] w-full px-[35px] py-[50px] rounded-[8px] shadow-lg bg-very_light_gray dark:bg-very_dark_desaturated_blue text-very_dark_grayish_blue dark:text-light_grayish_blue">
        <h1 className="flex justify-center items-center text-[40px]">
          <FaSignInAlt />
          <span className="ml-[15px]"></span>
          Register
        </h1>
        <p className="mt-[10px] ">Register and start adding Todos</p>
        <form className="text-left mt-[25px] w-full" onSubmit={onSubmit}>
          <div>
            <label className="text-2xl">Name :</label>
            <input
              className="w-full mt-[15px] border-[2px] rounded-[8px] border-light_grayish_blue p-[10px] focus:outline-none dark:bg-very_dark_grayish_blue dark:border-none"
              type="text"
              name="name"
              id="name"
              value={formData.name}
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>
          <div className="mt-[15px]">
            <label className="text-2xl">Email :</label>
            <input
              className="w-full mt-[15px] border-[2px] rounded-[8px] border-light_grayish_blue p-[10px] focus:outline-none dark:bg-very_dark_grayish_blue dark:border-none"
              type="email"
              name="email"
              id="email"
              value={formData.email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="mt-[15px]">
            <label className="text-2xl">Password :</label>
            <input
              className="w-full mt-[15px] border-[2px] rounded-[8px] border-light_grayish_blue p-[10px] focus:outline-none dark:bg-very_dark_grayish_blue dark:border-none"
              type="password"
              name="password"
              id="password"
              value={formData.password}
              placeholder="Enter your password"
              onChange={onChange}
            />
          </div>
          <div className="mt-[15px]">
            <label className="text-2xl">Confirm password :</label>
            <input
              className="w-full mt-[15px] border-[2px] rounded-[8px] border-light_grayish_blue p-[10px] focus:outline-none dark:bg-very_dark_grayish_blue dark:border-none"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm your password"
              onChange={onChange}
            />
          </div>
          <button
            className="w-full p-[10px] bg-green-600 mt-[40px] rounded-[8px] text-white font-bold dark:bg-green-700"
            type="submit"
          >
            {isLoading ? "Please Wait..." : "Register"}
          </button>
        </form>
        <p className="mt-[15px]">
          Already have an account?
          <span
            className="ml-[5px] font-bold text-blue-600 cursor-pointer"
            onClick={navigateLogin}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};
export default Register;
