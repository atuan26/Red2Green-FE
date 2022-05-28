import React, { useState } from "react";
import { MdAddTask } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { connect } from "react-redux";
import {
  addTask,
  deleteTask,
  editTask,
} from "../../../../redux/actions/taskAction";
import TaskItem from "./TaskItem";
import "./TaskList.css";
import CategoryList from "./CategoryList";
import TaskListSvg from "./undraw_task_list_6x9d.svg"

const TaskList = ({ currentCategory, categoryList, taskList, addTask }) => {
  const [newTask, setNewTask] = useState("");
  const [toggleAdd, setToggleAdd] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const handleAddTask = (e) => {
    if (e.key === "Enter") {
      addTask({ title: newTask, category: currentCategory?.id });
      setNewTask("");
    }
  };
  return (
    <div className="relative max-h-[550px] shadow-lg rounded-2xl bg-white dark:bg-gray-700 overflow-hidden p-2">
      <img className="absolute opacity-20 bottom-0 right-0 object-cover h-40  pointer-events-none" src={TaskListSvg} alt="" />
      <div className="w-full pb-0 flex justify-between">
        <button
          className="font-bold w-full text-left text-md p-2 text-black dark:text-white hover:text-gray-800"
          onClick={() => setShowCategory(true)}
        >
          <FaTasks className="inline-block mx-3 h-4" />
          {currentCategory.title || "All Task"}
          <span className="text-sm text-gray-500 dark:text-gray-300 ml-2">
            ({taskList.filter(c => c.is_complete === true).length}/{taskList.length})
          </span>
        </button>
        <button>
          <svg
            onClick={() => setToggleAdd(!toggleAdd)}
            fill="currentColor"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 flex items-center rounded-full p-1.5 mr-4 hover:bg-gray-300 hover:text-black dark:text-gray-50 dark:hover:text-white text-gray-800 border-0 focus:outline-none"
          >
            <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z"></path>
          </svg>
        </button>
      </div>
      {toggleAdd && (
        <div className="relative ">
          <input
            className="px-10 w-full mx-auto outline-none border-b-2 border-gray-100"
            placeholder="New task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyUp={handleAddTask}
            autoFocus
          />
          <MdAddTask className="absolute left-3 top-1" />
        </div>
      )}
      {showCategory && (
        <CategoryList
          category={currentCategory}
          close={() => setShowCategory(false)}
          categoryList={categoryList}
        />
      )}
      <ul className="p-2 pt-0 overflow-auto  max-h-[500px] ">
        {taskList.map((task, index) => (
          <TaskItem key={index} index={index} task={task} />
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  taskList: state.task.taskList.filter(
    (c, i) => c.category === state.task.currentCategory.id
  ),
  currentCategory: state.task.currentCategory || { id: null },
  categoryList: state.task.taskList.filter((c, i) => c.category === null),
});
const mapDispatchtoProps = (dispatch) => ({
  addTask: (task) => dispatch(addTask(task)),
  editTask: (task, title) => dispatch(editTask(task, title)),
  deleteTask: (task) => dispatch(deleteTask(task)),
});
export default connect(mapStateToProps, mapDispatchtoProps)(TaskList);
