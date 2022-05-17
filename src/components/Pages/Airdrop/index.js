import React, { useEffect, useMemo, useState } from "react";
import Table from "./Table";
import api from "../../../redux/actions";
import { BsFillPatchCheckFill, BsFillPatchExclamationFill, BsPatchQuestionFill } from "react-icons/bs";
import { connect } from "react-redux";

const AirdropPage = ({ isAuthenticated }) => {
  const [data, setData] = useState({ count: 0, results: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    api.get("/airdrops/")
      .then((result) => {
        console.log(result.data);
        setData(result.data);
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isAuthenticated]);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        width: 50,
        Cell: (row) => <div>{parseInt(row.row.id) + 1}</div>,
        className: 'text-center',
      },
      {
        Header: "Name",
        accessor: "name",

      },
      {
        Header: "Reward",
        accessor: "information.reward",
        Cell: (row) => { return row.value || <div className="text-gray-500">N/A</div> },
        className: 'text-center ',
      },
      {
        Header: "Requirement",
        accessor: "information.requirement",
        Cell: (row) => {
          if (row.value) {
            return row.value.map(r => r.label).join(' ')
          }
          return 'No requirement'
        },
        className: 'text-center ',
      },
      {
        Header: "Start time",
        accessor: "start",
        disableFilters: true,
        Cell: (props) =>
          `${new Date(props.value).toLocaleDateString()} ${new Date(
            props.value
          ).toLocaleTimeString()}`,
      },
      {
        Header: "End time",
        accessor: "end",
        disableFilters: true,
        Cell: (props) => {
          if (props.value)
            return `${new Date(props.value).toLocaleDateString()} ${new Date(
              props.value
            ).toLocaleTimeString()}`
          else return 'Undefined'
        },
      },
      {
        Header: "Status",
        accessor: "status",
        // accessor: row => {
        //   const status = new Date(row.end) - new Date()
        //   if (!row.end) return { code: -1, label: "Unknown", className: "inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" }
        //   if (!row.start) return { code: 0, label: "Upcoming", className: "inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none       bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" }
        //   if (status >= 0) return { code: 1, label: "Ongoing", className: "inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none       bg-yellow-400 hover:bg-yellow-600 focus:ring-yellow-100 dark:bg-yellow-600 dark:hover:bg-yellow-500 dark:focus:ring-yellow-600" }
        //   else if (status < 0) return { code: 2, label: "Ended", className: "inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none       bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800" }
        // },
        Cell: (row) => {
          let label
          let styleButtonClassname = "inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none "
          switch (row.value) {
            case -1:
              label = "Unknown"
              styleButtonClassname += "bg-gray-700 hover:bg-gray-800 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              break;
            case 0:
              label = "Upcoming"
              styleButtonClassname += "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              break;
            case 1:
              label = "Ongoing"
              styleButtonClassname += "bg-yellow-400 hover:bg-yellow-600 focus:ring-yellow-100 dark:bg-yellow-600 dark:hover:bg-yellow-500 dark:focus:ring-yellow-600"
              break;
            case 2:
              label = "Ended"
              styleButtonClassname += "bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800"
              break;
            default:
              label = "Error"
              styleButtonClassname += "bg-gray-700 hover:bg-gray-800 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              break;
          }
          return <button
            className={styleButtonClassname}>{label}</button>
        },
        width: 120,
      },
      {
        Header: "Distribution",
        accessor: "is_distributed",
        disableFilters: true,
        Cell: (row) => {
          if (row.value === true) return <BsFillPatchCheckFill className=" w-6 h-6 text-green-400" />;
          else if (row.value === false) return <BsFillPatchExclamationFill className=" w-6 h-6 text-red-500" />;
          else return <BsPatchQuestionFill className="w-6 h-6 text-yellow-300" />
        },
        width: 120,
        className: 'text-center  flex justify-center items-center ',
      },
    ], []);

  return (
    <div className="grid grid-cols-4 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 ">
      <div className="col-span-4 z-base md:col-span-2 lg:col-span-3">
        <div className="w-full shadow-lg rounded-lg bg-white mb-4 ">

          <Table
            columns={columns}
            data={data}
            airdropLoading={[loading, setLoading]}
          />
        </div>
      </div>
      <div className="col-span-4 md:col-span-1"></div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchtoProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchtoProps)(AirdropPage);
