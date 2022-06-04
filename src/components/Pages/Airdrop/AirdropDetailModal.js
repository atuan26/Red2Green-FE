import React, { useMemo, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { connect } from "react-redux";
import {
  airdropConstants,
  socialList,
} from "../../../redux/actions/airdropAction";
import Countdown from "./../../Other/Countdown";
import { MdCheck, MdOutlineContentCopy } from "react-icons/md";
import { toast } from "react-toastify";
import { SharingButton } from "../../Other/TelegramWidget";

const AirdropDetailModal = ({ showDetailModal, airdropData, close }) => {
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
                <ModalContent airdropData={airdropData} />
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
}) => {
  const [star, setStar] = useState(false);
  const [copy, setCopy] = useState(false);
  const startMemo = useMemo(() => start, []);
  const endMemo = useMemo(() => end, []);
  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopy(true);
    toast.success("Copied to clipboard!");
  };
  return (
    <div className="mx-4 mb-4 mt-1  overflow-auto h-full">
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
            {status === 1 && (
              <span className="w-full flex justify-end pb-4">
                <Countdown time={endMemo} label="ends in: " />
              </span>
            )}
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
            {is_joined ? (
              <>
                <div className="flex items-center gap-2 py-1 m-2 text-green-500">
                  <MdCheck className="text-green-500 h-5 w-5" />
                  You've joined this airdrop.
                </div>
                <div className="w-full capitalize btn btn-sm  bg-white  text-red-400 border-red-500 hover:text-white  hover:border-0 hover:bg-blue-400">
                  Mark as unjoin
                </div>
              </>
            ) : (
              <div className="w-full capitalize btn btn-sm mt-4 bg-blue-500 border-0 hover:bg-blue-400">
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
            task_list?.map((task) => {
              return <TaskItem content={task?.task} />;
            })}
        </ul>
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
});

export default connect(mapStateToProps, mapDispatchtoProps)(AirdropDetailModal);
