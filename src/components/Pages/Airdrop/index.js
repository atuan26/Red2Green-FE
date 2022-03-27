import React, { useEffect, useState } from "react";
import Table from "./Table";
import api from "../../../redux/actions";
import Filter from "./Filter2";
import { CgAdd } from "react-icons/cg";
import AirdropModalForm from "../../Other/Modal/AirdropModalForm";
import { BsFillPatchCheckFill, BsFillPatchExclamationFill, BsPatchQuestionFill } from "react-icons/bs";

const App = () => {
  const [data, setData] = useState({ count: 0, results: [] });
  const [showAirdropModal, setshowAirdropModal] = useState(false)

  useEffect(() => {
    // loadAirdrop()
    api.get("/airdrops/")
      .then((result) => {
        // console.log(result.data);
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "#",
        filterable: false,
        sortable: false,
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
        Header: "Start time",
        accessor: "start",
        Cell: (props) =>
          `${new Date(props.value).toLocaleDateString()} ${new Date(
            props.value
          ).toLocaleTimeString()}`,
      },
      {
        Header: "End time",
        accessor: "end",
        Cell: (props) =>
          `${new Date(props.value).toLocaleDateString()} ${new Date(
            props.value
          ).toLocaleTimeString()}`,
      },
      {
        Header: "Status",
        accessor: "",
        Cell: (row) => {
          let status
          status = new Date(row.row.original.end) - new Date()
          console.log('status', status);
          if (new Date(row.row.original.start) - new Date() > 0) {
            return <button
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Upcoming</button>
          }
          else if (status >= 0) {
            return <button
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-yellow-400 rounded-lg hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-100 dark:bg-yellow-600 dark:hover:bg-yellow-500 dark:focus:ring-yellow-600">Ongoing</button>
          }
          else if (status < 0) {
            return <button
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800">Ended</button>
          }
        },
        width: 120,
      },
      {
        Header: "Distribution",
        accessor: "is_distributed",
        Cell: (row) => {
          if (row.value === true) return <BsFillPatchCheckFill className="inline w-6 h-6 text-green-400" />;
          else if (row.value === false) return <BsFillPatchExclamationFill className="inline w-6 h-6 text-red-500" />;
          else return <BsPatchQuestionFill className="inline w-6 h-6 text-yellow-300" />
        },
        width: 120,
        className: 'text-center ',
      },
    ], []);
  return (
    <>
      <Filter />
      <div className="w-full shadow-lg rounded-lg bg-white mb-4 ">
        <button
          onClick={() => {
            setshowAirdropModal(true);
          }}
          className="m-6 mb-0 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2">
          <CgAdd className="inline h-4 w-4 mr-1" />New airdrop
        </button>
        {showAirdropModal && (
          <AirdropModalForm
            close={() => setshowAirdropModal(false)}
          />
        )}
        <Table
          columns={columns}
          data={data}
        />
      </div>
    </>
  );
};

export default App;
