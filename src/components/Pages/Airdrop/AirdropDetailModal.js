import React, { useMemo, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { connect } from "react-redux";
import { airdropConstants } from "../../../redux/actions/airdropAction";
import Countdown from "./../../Other/Countdown";

const AirdropDetailModal = ({ showDetailModal, airdropData, close }) => {
  return (
    <>
      {showDetailModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto sm:max-w-sm md:max-w-md">
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
    description,
  },
}) => {
  const [star, setStar] = useState(false);
  const startMemo = useMemo(() => start, []);
  const endMemo = useMemo(() => end, []);
  return (
    <div className="mx-4 mb-4">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          {star ? (
            <AiFillStar
              onClick={(e) => setStar((star) => !star)}
              className="w-5 h-5 text-yellow-300 cursor-pointer"
            />
          ) : (
            <AiOutlineStar
              onClick={(e) => setStar((star) => !star)}
              className="w-5 h-5 text-yellow-300 cursor-pointer"
            />
          )}
          {name}
        </div>
        {status == 1 && (
          <span className="">
            <Countdown time={endMemo} label="end in" />
          </span>
        )}
        {status == 0 && (
          <span className="">
            <Countdown time={startMemo} label="start in" />
          </span>
        )}
      </div>
      <div className="flex gap-2">
        Requirement:
        <p>
          {information?.requirement?.map((r) => r.label?.trim()).join(", ")}
        </p>
      </div>
      <div>{description}</div>
      <div>
        How to participate?
        <ul>
          {task_list.constructor.name == "Array" &&
            task_list?.map((task) => {
              return <li className="pl-2">{task?.task}</li>;
            })}
        </ul>
      </div>
      {/* <div>{link}</div> */}
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
