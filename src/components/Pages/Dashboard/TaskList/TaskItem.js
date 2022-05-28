import { FcSynchronize } from "react-icons/fc";
import { BsCheckSquare, BsCheckSquareFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { connect } from "react-redux";
import {
  deleteTask,
  editTask,
  setEditingTask,
} from "../../../../redux/actions/taskAction";

const TaskItem = ({
  index,
  task,
  editingTask,
  editTask,
  setEditingTask,
  deleteTask,
}) => {
  const handleEdit = (e) => {
    if (
      e.key === "Enter" &&
      editingTask.title.trim() &&
      editingTask.title.trim() !== task.title
    ) {
      editTask({ ...editingTask, title: editingTask.title.trim() });
    } else if (
      e.key === "Escape" ||
      (e.key === "Enter" && editingTask.title.trim() === task.title)
    ) {
      setEditingTask({});
    } else if (e.key === undefined) {
      if (editingTask.title.trim() === task.title) {
        setEditingTask({});
      } else {
        editTask({ ...editingTask, title: editingTask.title.trim() });
      }
    }
  };
  return (
    <li
      onDoubleClick={() => setEditingTask(task)}
      onBlur={handleEdit}
      className="flex items-center hover:text-gray-500  text-gray-600 dark:text-gray-200 justify-between py-2 border-b-2 border-gray-100 dark:border-gray-800"
    >
      {editingTask.id === task.id ? (
        <input
          value={editingTask.title}
          onChange={(e) => setEditingTask({ ...task, title: e.target.value })}
          onKeyUp={handleEdit}
          className="text-gray-700 text-sm px-10 outline-none"
          autoFocus
        />
      ) : (
        <>
          <div className="task_item relative flex items-center justify-start text-sm w-full">
            <CompleteIcon
              is_complete={task.is_complete}
              toggle={() =>
                editTask({ ...task, is_complete: !task.is_complete })
              }
            />
            <span className={task.is_complete ? " text-gray-400 mr-2" : "mr-2"}>
              {index + 1}.
            </span>
            <span
              className={task.is_complete ? "line-through text-gray-400" : null}
            >
              {task.title || "Untitled"}
            </span>
            {task.repetition && (
              <span className="lg:ml-6 ml-2 flex items-center text-gray-400 dark:text-gray-300">
                <FcSynchronize />
              </span>
            )}
            <IoClose
              onClick={() => deleteTask(task)}
              className="delete_icon absolute hidden right-0 mx-4 w-4 h-4 hover:bg-red-500 hover:text-white rounded-full"
            />
          </div>
        </>
      )}
    </li>
  );
};

const CompleteIcon = ({ is_complete, toggle }) => {
  return is_complete ? (
    <BsCheckSquareFill
      className="mx-4 h-4 w-4 text-green-500 hover:text-gray-300"
      onClick={toggle}
    />
  ) : (
    <BsCheckSquare
      className="mx-4 h-4 w-4  hover:text-green-500"
      onClick={toggle}
    />
  );
};

const mapStateToProps = (state) => ({
  taskList: state.task.taskList || [],
  editingTask: state.task.editingTask || {},
  currentCategory: state.task.currentCategory || null,
  categoryList: state.task.taskList.filter((c, i) => c.category === null),
});
const mapDispatchtoProps = (dispatch) => ({
  editTask: (task) => dispatch(editTask(task)),
  deleteTask: (task) => dispatch(deleteTask(task)),
  setEditingTask: (title) => dispatch(setEditingTask(title)),
});
export default connect(mapStateToProps, mapDispatchtoProps)(TaskItem);
