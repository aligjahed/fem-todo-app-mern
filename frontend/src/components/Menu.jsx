import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  onlyActive,
  onlyComplete,
  showAll,
  deleteTodo,
} from "../features/todos/todosSlice";

const Menu = ({ todoLength }) => {
  const dispatch = useDispatch();
  const { isLoading, isUpdate, isError, message, onlyCompleted } = useSelector(
    (state) => state.todos
  );

  const [currentFilter, setCurrentFilter] = useState("all");

  const onClick = (e) => {
    if (e.target.id === "active") {
      dispatch(onlyActive());
      setCurrentFilter("active");
    }

    if (e.target.id === "completed") {
      dispatch(onlyComplete());
      setCurrentFilter("completed");
    }

    if (e.target.id === "all") {
      dispatch(showAll());
      setCurrentFilter("all");
    }
  };

  const deleteCompleted = () => {
    onlyCompleted.map((todo) => dispatch(deleteTodo(todo._id)));
  };

  useEffect(() => {
    dispatch(showAll());
    setCurrentFilter("all");
  }, [dispatch, isLoading, isUpdate, isError]);

  return (
    <div className="absolute bottom-0 flex flex-col items-center justify-center w-full h-[50px] text-very_dark_grayish_blue dark:text-very_dark_grayish_blue">
      <hr className="absolute top-0 w-full opacity-25" />
      <div className="flex w-full items-center justify-around text-[10px] md:text-[14px] font-bold">
        <h3 className="text-very_dark_grayish_blue">{todoLength}</h3>
        <div className="flex items-center space-x-[10px]  ">
          <h3
            className={
              currentFilter === "all"
                ? "cursor-pointer text-bright_blue"
                : "cursor-pointer active:text-light_grayish_blue"
            }
            onClick={onClick}
            id="all"
          >
            All
          </h3>
          <h3
            className={
              currentFilter === "active"
                ? "cursor-pointer text-bright_blue"
                : "cursor-pointer active:text-light_grayish_blue"
            }
            onClick={onClick}
            id="active"
          >
            Active
          </h3>
          <h3
            className={
              currentFilter === "completed"
                ? "cursor-pointer text-bright_blue"
                : "cursor-pointer active:text-light_grayish_blue"
            }
            onClick={onClick}
            id="completed"
          >
            Completed
          </h3>
        </div>
        <h3
          className="cursor-pointer active:text-light_grayish_blue"
          onClick={deleteCompleted}
        >
          Clear completed
        </h3>
      </div>
    </div>
  );
};
export default Menu;
