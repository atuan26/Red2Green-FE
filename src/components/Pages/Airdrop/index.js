import React, { useEffect, useMemo, useState } from "react";
import Table from "./Table";
import api from "../../../redux/actions";
import {
  BsFillPatchCheckFill,
  BsFillPatchExclamationFill,
  BsPatchQuestionFill,
} from "react-icons/bs";
import { connect } from "react-redux";
import {
  airdropConstants,
  loadAirdrop,
} from "../../../redux/actions/airdropAction";
import AirdropDetailModal from "./AirdropDetailModal";

const AirdropPage = ({
  isAuthenticated,
  loadAirdrop,
  airdropList,
  showAirdropFormModal,
  showAirdropDetailModal,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    loadAirdrop();
    setLoading(false);
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        width: 50,
        Cell: (row) => <div>{parseInt(row.row.id) + 1}</div>,
        className: "text-center",
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ value, row }) => (
          <span
            onClick={() => showAirdropDetailModal(row.original)}
            className="hover:text-blue-600 cursor-pointer"
          >
            {value}
          </span>
        ),
        className: "font-semibold",
      },
      {
        Header: "Requirement",
        accessor: "information.requirement",
        Cell: (row) => {
          if (row.value) {
            return row.value.map((r) => r.label).join(" ");
          }
          return <div className="text-gray-400">No requirement</div>;
        },
        className: "text-center ",
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
            ).toLocaleTimeString()}`;
          else return <span className="text-gray-500 ">-</span>;
        },
        className: "text-center ",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: (row) => {
          let label;
          let styleButtonClassname =
            "inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none ";
          switch (row.value) {
            case -1:
              label = "Unknown";
              styleButtonClassname +=
                "bg-gray-500 hover:bg-gray-800 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800";
              break;
            case 0:
              label = "Upcoming";
              styleButtonClassname +=
                "bg-blue-500 hover:bg-blue-600 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
              break;
            case 1:
              label = "Ongoing";
              styleButtonClassname +=
                "bg-yellow-400 hover:bg-yellow-600 focus:ring-yellow-100 dark:bg-yellow-600 dark:hover:bg-yellow-500 dark:focus:ring-yellow-600";
              break;
            case 2:
              label = "Ended";
              styleButtonClassname +=
                "bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800";
              break;
            default:
              label = "Error";
              styleButtonClassname +=
                "bg-gray-700 hover:bg-gray-800 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800";
              break;
          }
          return <button className={styleButtonClassname}>{label}</button>;
        },
        // width: 120,
        className: "  flex justify-center items-center ",
      },
      {
        Header: "Distribution",
        accessor: "is_distributed",
        disableFilters: true,
        Cell: (row) => {
          if (row.value === true)
            return <BsFillPatchCheckFill className=" w-6 h-6 text-green-400" />;
          else if (row.value === false)
            return (
              <BsFillPatchExclamationFill className=" w-6 h-6 text-red-500" />
            );
          else
            return <BsPatchQuestionFill className="w-6 h-6 text-yellow-300" />;
        },
        width: 100,
        className: "text-center  flex justify-center items-center ",
      },
    ],
    []
  );
  return (
    <div className="grid grid-cols-4 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 ">
      <AirdropDetailModal />
      <div className="col-span-4 z-base xl:col-span-3 ">
        <div className="w-full shadow-lg rounded-lg bg-white mb-4 ">
          <Table
            columns={columns}
            data={airdropList}
            airdropLoading={[loading, setLoading]}
            showAirdropFormModal={showAirdropFormModal}
          />
        </div>
      </div>
      <div className="col-span-4 xl:col-span-1"></div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  airdropList: state.airdrop.airdropList,
});

const mapDispatchtoProps = (dispatch) => ({
  loadAirdrop: () => dispatch(loadAirdrop()),
  showAirdropFormModal: (payload) =>
    dispatch({
      type: airdropConstants.SHOW_AIRDROP_FORM_MODAL,
      payload: payload,
    }),
  showAirdropDetailModal: (payload) =>
    dispatch({
      type: airdropConstants.SHOW_AIRDROP_DETAIL_MODAL,
      payload: payload,
    }),
});

export default connect(mapStateToProps, mapDispatchtoProps)(AirdropPage);
