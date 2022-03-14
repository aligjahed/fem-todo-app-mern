import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTodos, reset } from "../features/todos/todosSlice";
import AddTodo from "../components/AddTodo";
import TodoItem from "../components/TodoItem";
import Menu from "../components/Menu";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { todos, isUpdated, isLoading, isError, message, onlyActive } =
    useSelector((state) => state.todos);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getTodos());
  }, [user, navigate, isError, message, dispatch, isUpdated]);

  return (
    <div className="relative max-w-[540px] w-full s rounded-[8px] mb-[50px] p-[20px] md:p-0 ">
      <AddTodo />
      <div className=" relative w-full h-[440px] mt-[25px] bg-very_light_grayish_blue dark:bg-very_dark_desaturated_blue rounded-[8px] shadow-2xl ">
        <div className="h-[390px] overflow-auto text-very_dark_grayish_blue dark:text-light_grayish_blue">
          {!isLoading && !isUpdated ? (
            todos.length > 0 ? (
              todos.map((todo) => <TodoItem key={todo._id} todo={todo} />)
            ) : (
              <h3 className="text-center mt-[25px]">
                You have no todo in here yet
              </h3>
            )
          ) : (
            <h3 className="text-center mt-[25px]">Please wait...</h3>
          )}
        </div>
        <Menu
          todoLength={
            !isLoading && !isUpdated
              ? onlyActive.length + " items left"
              : "Please wait"
          }
        />
      </div>
    </div>
  );
};
export default Dashboard;
