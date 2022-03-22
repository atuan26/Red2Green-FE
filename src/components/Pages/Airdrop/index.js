import React, { useEffect, useState } from "react";
import Table from "./Table";
import api from "../../../redux/actions";
import Filter from "./Filter2";
import { CgAdd } from "react-icons/cg";
import AirdropModalForm from "../../Other/Modal/AirdropModalForm";

const App = () => {
  const [data, setData] = useState({ count: 0, results: [] });
  const [showAirdropModal, setshowAirdropModal] = useState(false)

  useEffect(() => {
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
        accessor: "title",
      },
      {
        Header: "Reward",
        accessor: "information?.reward ",
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
      },
      {
        Header: "Distribution",
        accessor: "is_distributed",
        className: 'text-center',
        Cell: (row) => { if (row.value === true) return 'Yes'; else if (row.value === false) return 'No'; else return 'Unknown' },
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
