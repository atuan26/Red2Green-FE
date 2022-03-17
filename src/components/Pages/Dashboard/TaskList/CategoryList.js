import { connect } from "react-redux";
import { setCurrentCategory } from "../../../../redux/actions/taskAction";

const CategoryList = ({
  category,
  categoryList,
  close,
  setCurrentCategory,
}) => {
  return (
    <div className="absolute inset-0">
      <div className="text-center pt-2 absolute top-0 bottom-1/2 w-full bg-white h-2/3 z-20 shadow-lg rounded-2xl">
        <div
          onClick={close}
          className="font-medium text-md py-1 text-black dark:text-white "
        >
          {category.title || "Choose category:"}
        </div>
        <ul className="overflow-auto h-[calc(100%-40px)] no-scrollbar">
          <CategoryItem
            name="All"
            setCate={() => {
              setCurrentCategory({ id: null });
              close();
            }}
          />
          {categoryList.map((cate, index) => (
            <CategoryItem
              key={index}
              name={cate.title}
              setCate={() => {
                setCurrentCategory(cate);
                close();
              }}
            />
          ))}
        </ul>
      </div>
      <div
        className="absolute inset-0 bg-gray-400 opacity-20 shadow-lg rounded-2xl"
        onClick={close}
      ></div>
    </div>
  );
};

const CategoryItem = ({ name, setCate }) => (
  <li
    onClick={setCate}
    className="items-center text-gray-600 dark:text-gray-200 justify-between py-1 cursor-pointer hover:text-gray-800 hover:bg-gray-200 border-y-2 border-gray-100 dark:border-gray-800"
  >
    {name}
  </li>
);

const mapStateToProps = (state) => ({
  taskList: state.task.taskList || [],
  currentCategory: state.task.currentCategory || {},
  categoryList: state.task.taskList.filter((c, i) => c.category === null),
});
const mapDispatchtoProps = (dispatch) => ({
  setCurrentCategory: (task) => dispatch(setCurrentCategory(task)),
});
export default connect(mapStateToProps, mapDispatchtoProps)(CategoryList);
