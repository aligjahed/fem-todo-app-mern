import { useEffect, useRef } from "react";
import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  updateTodo,
  reset,
  getTodos,
} from "../features/todos/todosSlice";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const { message, isError, isLoading } = useSelector((state) => state.todos);

  const idObject = useRef();

  const removeTodo = () => {
    dispatch(deleteTodo(idObject.current.id));
  };

  const changeCompleted = (e) => {
    dispatch(updateTodo(idObject.current.id));
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
  }, [message, isError]);

  return (
    <div className="flex flex-col justify-center group ">
      <div
        className="flex items-center justify-between px-[20px] py-[18px] md:py-[22px]"
        id={todo._id}
        ref={idObject}
      >
        <div className="flex items-center ">
          <span
            className={todo.completed ? "completed" : "uncompleted"}
            onClick={changeCompleted}
          >
            <h1
              className={todo.completed ? "completedIcon" : "uncompletedIcon"}
            >
              <FaCheck />
            </h1>
          </span>
          <h1
            className={
              todo.completed
                ? "font-bold text-[18px] opacity-50 line-through"
                : "font-bold text-[18px]"
            }
          >
            {todo.todo}
          </h1>
        </div>
        <h1
          className="text-center font-bold w-[20px] text-[14px] md:text-[18px] md:hidden md:group-hover:block cursor-pointer"
          onClick={removeTodo}
        >
          X
        </h1>
      </div>
      <hr className="w-full opacity-25" />
    </div>
  );
};
export default TodoItem;
