import React, { useMemo, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { connect } from "react-redux";
import {
  airdropConstants,
  joinAirdrop,
  socialList,
  unJoinAirdrop,
} from "../../../redux/actions/airdropAction";
import Countdown from "./../../Other/Countdown";
import { MdCheck, MdOutlineContentCopy } from "react-icons/md";
import { toast } from "react-toastify";
import { SharingButton } from "../../Other/TelegramWidget";
import moment from "moment";

const AirdropDetailModal = ({
  showDetailModal,
  airdropData,
  close,
  join_airdrop,
  unjoin_airdrop,
}) => {
  return (
    <>
      {showDetailModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-[90vh]">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-2">
                <div className="w-full flex justify-end gap-2 ">
                  <button
                    // onClick={}
                    className="btn btn-sm btn-circle border-0 bg-white hover:bg-gray-200 text-gray-600"
                  >
                    <BiPencil className="w-4 h-4" />
                  </button>
                  <button
                    // onClick={() => {
                    //   showComfirmModal({
                    //     active: true,
                    //     message: {
                    //       label: "Do you want to delete this event?",
                    //     },
                    //     onConfirm: deleteEvent,
                    //   });
                    //   close();
                    // }}
                    className="btn btn-sm btn-circle border-0 bg-white hover:bg-gray-200 text-gray-600"
                  >
                    <BsTrash className="w-4 h-4" />
                  </button>
                  <button
                    onClick={close}
                    className="btn btn-sm btn-circle border-0 bg-white hover:bg-gray-200 text-gray-600"
                  >
                    <BsThreeDotsVertical className="w-4 h-4" />
                  </button>
                  <button
                    onClick={close}
                    className="btn btn-sm btn-circle border-0 bg-white hover:bg-gray-200 text-gray-600"
                  >
                    <IoCloseSharp className="w-4 h-4" />
                  </button>
                </div>
                <ModalContent
                  airdropData={airdropData}
                  joinAirdrop={join_airdrop}
                  unJoinAirdrop={unjoin_airdrop}
                />
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};

const ModalContent = ({
  airdropData: {
    id,
    name,
    start,
    end,
    link,
    uploader,
    status,
    information,
    social,
    task_list,
    is_distributed,
    is_joined,
    description,
  },
  joinAirdrop,
  unJoinAirdrop,
}) => {
  const [joined, setJoin] = useState(is_joined);
  const [star, setStar] = useState(false);
  const [copy, setCopy] = useState(false);
  const [loading, setLoading] = useState(false);
  const startMemo = useMemo(() => start, []);
  const endMemo = useMemo(() => end, []);
  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopy(true);
    toast.success("Copied to clipboard!");
  };
  return (
    <div className="mx-4 mb-4 mt-1">
      <div className="flex items-center  mb-3 text-lg font-semibold text-green-500">
        {star ? (
          <AiFillStar
            onClick={() => setStar((star) => !star)}
            className=" mr-2 w-5 h-5 text-yellow-300 cursor-pointer"
          />
        ) : (
          <AiOutlineStar
            onClick={() => setStar((star) => !star)}
            className=" mr-2 w-5 h-5 text-yellow-300 cursor-pointer"
          />
        )}
        {name}
      </div>

      <div className="overflow-auto h-full">
        <div className="flex justify-between gap-2">
          <div>
            <div className="text-lg mb-3">
              {description && (
                <>
                  Airdrop Description
                  <p className="text-base text-gray-600">{description}</p>
                </>
              )}
              {information?.reward && (
                <p className="text-base text-gray-600 my-2">
                  -Reward:{" "}
                  <span className="ml-2 text-gray-800">
                    {information?.reward}
                  </span>
                </p>
              )}
              {information?.winner && (
                <p className="text-base text-gray-600 my-2">
                  -Winner:{" "}
                  <span className="ml-2 text-gray-800">
                    {information?.winner}
                  </span>
                </p>
              )}
            </div>
            <div className="text-lg mb-3">
              Requirements:
              <div className="mx-2 text-base text-gray-600">
                {information?.requirement?.map((r, i) => {
                  const icon = socialList.filter((obj) => {
                    return obj.value === r.value;
                  });
                  return (
                    <div key={i} className="m-2">
                      {icon[0]?.icon}
                      {r.label}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <div className="p-4 w-full rounded-md min-h-16 bg-gray-100 shadow-md">
              <span className="w-full flex justify-end pb-4">
                {status === 1 && <Countdown time={endMemo} label="ends in: " />}
                {status === 2 && (
                  <div class="bg-red-200 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900 flex gap-2 items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    ends {moment(endMemo).fromNow()}
                  </div>
                )}
                {status === 0 && (
                  <div class="bg-blue-200 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-900 flex gap-2 items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    starts {moment(startMemo).fromNow()}
                  </div>
                )}
              </span>
              <div className="flex justify-between pb-4">
                <a
                  onClick={() =>
                    window.open(
                      link,
                      "_blank",
                      "location=yes,height=768,width=1280,scrollbars=yes,status=yes"
                    )
                  }
                  className="link link-primary"
                >
                  JOIN NOW!
                </a>
                <SharingButton url={link} />
              </div>
              <div className="relative text-gray-600 bg-gray-300 w-full overflow-hidden shadow-sm rounded-md p-1 px-2 whitespace-nowrap">
                {link}
                <div
                  onClick={handleCopy}
                  className="absolute p-2 right-0 top-0 bg-white cursor-pointer hover:bg-gray-50"
                >
                  {!copy ? (
                    <MdOutlineContentCopy className="w-4 h-4 text-orange-400" />
                  ) : (
                    <MdCheck className="w-4 h-4 text-green-500" />
                  )}
                </div>
              </div>
              {joined ? (
                <>
                  <div className="flex items-center gap-2 py-1 m-2 text-green-500">
                    <MdCheck className="text-green-500 h-5 w-5" />
                    You've joined this airdrop.
                  </div>
                  <div
                    onClick={() => {
                      setLoading(true);
                      unJoinAirdrop(id);
                      setJoin(!joined);
                      setLoading(false);
                    }}
                    className="w-full capitalize btn btn-sm  bg-white  text-red-400 border-red-500 hover:text-white  hover:border-0 hover:bg-red-400"
                  >
                    {loading && (
                      <svg
                        role="status"
                        className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="#1C64F2"
                        />
                      </svg>
                    )}
                    Mark as unjoin
                  </div>
                </>
              ) : (
                <div
                  onClick={() => {
                    setLoading(true);
                    joinAirdrop(id);
                    setJoin(!joined);
                    setLoading(false);
                  }}
                  className="w-full capitalize btn btn-sm mt-4 bg-blue-500 border-0 hover:bg-blue-400"
                >
                  {loading && (
                    <svg
                      role="status"
                      className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#1C64F2"
                      />
                    </svg>
                  )}
                  Mark as join
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="text-lg mb-3">
          How to participate?
          <ul className="px-5 ml-2 max-h-[300px] ">
            {task_list.constructor.name == "Array" &&
              task_list?.map((task, taskIndex) => {
                return <TaskItem key={taskIndex} content={task?.task} />;
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

const TaskItem = ({ content }) => {
  return (
    <div className="relative border-l border-gray-200 dark:border-gray-700 ">
      <span
        className={`flex absolute -left-3  justify-center items-center w-6 h-6 bg-blue-100 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900 text-blue-500`}
      >
        <IoMdArrowDropdownCircle />
      </span>
      <p className=" ml-5 text-base font-normal text-gray-500 dark:text-gray-400 pb-2">
        {content}
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  showDetailModal: state.airdrop.showDetailModal,
  airdropData: state.airdrop.detailModal,
});

const mapDispatchtoProps = (dispatch) => ({
  close: () => dispatch({ type: airdropConstants.CLOSE_MODAL }),
  join_airdrop: (id) => dispatch(joinAirdrop(id)),
  unjoin_airdrop: (id) => dispatch(unJoinAirdrop(id)),
});

export default connect(mapStateToProps, mapDispatchtoProps)(AirdropDetailModal);
