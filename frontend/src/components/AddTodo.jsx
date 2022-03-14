import { FaCheck } from "react-icons/fa";
import { createTodo, getTodos, reset } from "../features/todos/todosSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const AddTodo = () => {
  const [todo, setTodo] = useState({
    todo: "",
  });

  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector((state) => state.todos);

  const onChange = (e) => {
    setTodo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = () => {
    if (todo) {
      dispatch(createTodo(todo));
      setTodo({ todo: "" });
    }
  };

  return (
    <div className="w-full flex bg-very_light_grayish_blue dark:bg-very_dark_desaturated_blue px-[22px] py-[16px] md:py-[20px] rounded-[8px] text-very_dark_grayish_blue dark:text-light_grayish_blue shadow-xl  ">
      <div className="flex hover:cursor-pointer">
        <span
          className="relative rounded-[50%] w-[25px] h-[25px] border-[2px] border-gray-500 mr-[24px] group hover:bg-gradient-to-r from-gradient_1 to-gradient_2 hover:border-0 "
          onClick={onSubmit}
        >
          <h1 className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[12px] text-white hidden group-hover:block    ">
            <FaCheck />
          </h1>
        </span>
      </div>
      <input
        className="w-full bg-inherit focus:outline-none placeholder:font-bold font-bold"
        type="text"
        name="todo"
        id="todo"
        value={todo.todo}
        onChange={onChange}
        placeholder="Enter your todo"
      />
    </div>
  );
};
export default AddTodo;
