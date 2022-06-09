import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import {
  BsFillPatchCheckFill,
  BsFillPatchExclamationFill,
  BsFillPersonLinesFill,
  BsGlobe,
  BsPatchQuestionFill,
} from "react-icons/bs";
import { CgAdd } from "react-icons/cg";
import {
  MdCancel,
  MdCheckCircle,
  MdClose,
  MdDelete,
  MdOutlineDone,
  MdOutlineMoreHoriz,
  MdPending,
} from "react-icons/md";
import { AiTwotoneEdit, AiFillNotification } from "react-icons/ai";
import { connect } from "react-redux";
import Switch from "react-switch";
import {
  airdropConstants,
  approveAirdrop,
  declineAirdrop,
  loadAirdrop,
  loadPersonalAirdrop,
} from "../../../redux/actions/airdropAction";
import AirdropModalForm from "../../Other/Modal/AirdropModalForm";
import AirdropDetailModal from "./AirdropDetailModal";
import GlobalTable from "./GlobalTable";
import PersonalTable from "./PersonalTable";

const AirdropPage = ({
  isAuthenticated,
  loadAirdrop,
  loadPersonalAirdrop,
  airdropList,
  showAirdropFormModal,
  showAirdropDetailModal,
  airdropPersonalList,
  user,
  approveAirdrop,
  declineAirdrop,
}) => {
  const [loading, setLoading] = useState(false);
  const [table, setTable] = useState(true);
  useEffect(() => {
    setLoading(true);
    if (table) loadAirdrop();
    else loadPersonalAirdrop();
    setLoading(false);
  }, [isAuthenticated, table]);

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
        Cell: (props) => moment(props.value).format("lll"),
      },
      {
        Header: "End time",
        accessor: "end",
        disableFilters: true,
        Cell: (props) => {
          if (props.value) return moment(props.value).format("lll");
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
  const personalAirdropColumns = useMemo(
    () => [
      {
        id: "#",
        Header: "#",
        width: 20,
        Cell: (row) => <div>{parseInt(row.row.id) + 1}</div>,
        className: "text-center",
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ value, row }) => {
          let label;
          let styleButtonClassname = "";
          switch (row.original.status) {
            case -1:
              // label = "Unknown";
              // styleButtonClassname += "badge badge-sm gap-2 ml-2 ";
              break;
            case 0:
              label = "Upcoming";
              styleButtonClassname += "badge badge-sm gap-2 ml-2 badge-info";
              break;
            case 1:
              label = "Ongoing";
              styleButtonClassname += "badge badge-sm gap-2 ml-2 badge-warning";
              break;
            case 2:
              label = "Ended";
              styleButtonClassname +=
                " ml-2 bg-gray-400 text-gray-100 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-xl dark:bg-gray-700 dark:text-gray-300";
              break;
            default:
              label = "Error";
              styleButtonClassname +=
                "bg-gray-700 hover:bg-gray-800 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800";
              break;
          }
          return (
            <span
              onClick={() => showAirdropDetailModal(row.original)}
              className="hover:text-blue-600 cursor-pointer"
            >
              {value}
              <span className={styleButtonClassname}>{label}</span>
            </span>
          );
        },
        className: "font-semibold",
      },
      {
        Header: "End time",
        accessor: "end",
        disableFilters: true,
        Cell: (props) => {
          if (props.value) {
            return moment(props.value).fromNow();
          } else return <span className="text-gray-500 ">-</span>;
        },
        className: "text-center ",
        width: 100,
      },
      {
        id: "approval_status",
        Header: "Status",
        accessor: (row) => {
          switch (row.approval_status) {
            case null:
              return "pending";
            case true:
              return "approved";
            case false:
              return "decline";

            default:
              return;
          }
        },
        Cell: (row) => {
          let label;
          let styleButtonClassname = "badge badge-lg gap-2 ";
          let icon;
          switch (row.value) {
            case "pending":
              label = "Pending";
              styleButtonClassname += "badge-info p-4";
              icon = <MdPending />;
              break;
            case "approved":
              label = "Approved";
              styleButtonClassname += "badge-success p-4";
              icon = <MdCheckCircle />;
              break;
            case "decline":
              label = "Declined";
              styleButtonClassname += "badge-error p-4";
              icon = <MdCancel />;
              break;
            default:
              label = "Error";
              styleButtonClassname +=
                "bg-gray-700 hover:bg-gray-800 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800";
              break;
          }
          return (
            <div className={styleButtonClassname}>
              {icon}
              {label}
            </div>
          );
        },
        width: 80,
        className: "  flex justify-center",
      },
      user?.is_staff || user?.is_superuser
        ? {
            Header: "Uploader",
            accessor: "uploader",
            // disableFilters: true,
            Cell: (props) => {
              return props.value?.username || "-";
            },
            width: 100,
            className: "text-center ",
          }
        : {
            Header: "Distribution",
            accessor: "is_distributed",
            disableFilters: true,
            Cell: (row) => {
              if (row.value === true)
                return (
                  <BsFillPatchCheckFill className=" w-6 h-6 text-green-400" />
                );
              else if (row.value === false)
                return (
                  <BsFillPatchExclamationFill className=" w-6 h-6 text-red-500" />
                );
              else
                return (
                  <BsPatchQuestionFill className="w-6 h-6 text-yellow-300" />
                );
            },
            width: 100,
            className: "text-center  flex justify-center items-center ",
          },
      ,
      {
        Header: "Create at",
        accessor: "create_date",
        disableFilters: true,
        Cell: (props) => moment(props.value).format("lll"),
      },
      {
        id: "Action",
        Header: "Action",
        Cell: (row) => {
          const isAdminUser = user?.is_staff || user?.is_superuser;
          return (
            <div className="flex gap-2">
              <div className="tooltip" data-tip="Update news">
                <div
                  onClick={() => {}}
                  className="btn btn-sm bg-green-500 border-0 hover:bg-green-400"
                  disabled={row.row.original.approval_status !== true}
                >
                  <AiFillNotification className="w-4 h-4" />
                </div>
              </div>
              <div className="tooltip" data-tip="Edit">
                <div
                  onClick={() => {}}
                  className="btn btn-sm bg-yellow-400 border-0 hover:bg-yellow-300"
                  disabled={
                    row.row.original.approval_status !== null && !isAdminUser
                  }
                >
                  <AiTwotoneEdit className="w-4 h-4 " />
                </div>
              </div>
              <div className="tooltip" data-tip="Delete">
                <div
                  onClick={() => {}}
                  className="btn btn-sm bg-red-500 border-0 hover:bg-red-400"
                  disabled={
                    row.row.original.approval_status !== null && !isAdminUser
                  }
                >
                  <MdDelete className="w-4 h-4" />
                </div>
              </div>
              {isAdminUser && (
                <div class="dropdown dropdown-end">
                  <label
                    tabindex="0"
                    className="btn btn-sm bg-blue-500 border-0 hover:bg-blue-400"
                  >
                    <MdOutlineMoreHoriz className="w-4 h-4" />
                  </label>
                  <ul
                    tabindex="0"
                    class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 border border-gray-200"
                  >
                    <li>
                      <a
                        href="# "
                        className="!text-green-500"
                        onClick={() => {
                          approveAirdrop(row.row.original.id);
                        }}
                      >
                        <MdOutlineDone className="w-5 h-5 mr-2" />
                        Approve
                      </a>
                    </li>
                    <li>
                      <a
                        href="# "
                        className="!text-red-500"
                        onClick={() => {
                          declineAirdrop(row.row.original.id);
                        }}
                      >
                        <MdClose className="w-5 h-5 mr-2" />
                        Decline
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          );
        },
        className: "text-center",
      },
    ],
    []
  );
  return (
    <div className="grid grid-cols-4 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 ">
      <AirdropDetailModal />
      <AirdropModalForm />
      <div className="col-span-4 z-base xl:col-span-3 ">
        <div className="w-full shadow-lg rounded-lg bg-white mb-4 p-6">
          <div className="flex items-center justify-between">
            <Switch
              onChange={() => {
                setTable((t) => !t);
              }}
              checked={table}
              handleDiameter={28}
              offColor="#7e22ce"
              onColor="#0ea5e9"
              height={40}
              width={100}
              borderRadius={6}
              uncheckedIcon={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                    fontSize: 15,
                    color: "white",
                    paddingRight: 6,
                    fontWeight: 600,
                  }}
                >
                  Personal
                </div>
              }
              checkedIcon={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    fontSize: 15,
                    color: "white",
                    paddingLeft: 4,
                    fontWeight: 600,
                  }}
                >
                  Global
                </div>
              }
              uncheckedHandleIcon={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    width: "100%",
                    fontSize: 20,
                  }}
                >
                  <BsFillPersonLinesFill />
                </div>
              }
              checkedHandleIcon={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 20,
                  }}
                >
                  <BsGlobe />
                </div>
              }
            />
            <div
              onClick={() => showAirdropFormModal(true)}
              className="flex items-center  text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 cursor-pointer w-36"
            >
              <CgAdd className="inline h-5 w-5 mr-1" />
              New airdrop
            </div>
          </div>
          {table ? (
            <GlobalTable
              columns={columns}
              data={airdropList}
              airdropLoading={[loading, setLoading]}
              getRowProps={(row) => ({
                className:
                  "border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 ",
                style: {
                  backgroundColor: row.original.is_joined ? "#31c48d44" : " ",
                },
              })}
            />
          ) : (
            <PersonalTable
              columns={personalAirdropColumns}
              data={airdropPersonalList}
              airdropLoading={[loading, setLoading]}
              getRowProps={(row) => ({
                // className:
                //   "border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 ",
                // style: {
                //   backgroundColor: row.original.is_joined ? "#31c48d44" : " ",
                // },
              })}
            />
          )}
        </div>
      </div>
      <div className="col-span-4 xl:col-span-1"></div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  airdropList: state.airdrop.airdropList,
  airdropPersonalList: state.airdrop.personalAirdropList,
  user: state.auth?.user?.user,
});

const mapDispatchtoProps = (dispatch) => ({
  loadAirdrop: () => dispatch(loadAirdrop()),
  loadPersonalAirdrop: () => dispatch(loadPersonalAirdrop()),
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
  approveAirdrop: (payload) => dispatch(approveAirdrop(payload)),
  declineAirdrop: (payload) => dispatch(declineAirdrop(payload)),
});

export default connect(mapStateToProps, mapDispatchtoProps)(AirdropPage);
