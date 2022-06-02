import React, { useEffect, useMemo, useState } from "react";
import Table from "./Table";
import Filter from "./Filter";
import { connect } from "react-redux";
import { timeFormat } from "d3-time-format";
import { Modal } from "../../Other/Modal";
import SignalDetailModal from "./SignalDetailModal";
import { loadSignal } from "../../../redux/actions/signalAction";

const SignalPage = ({
  signalData,
  isAuthenticated,
  loadSignal,
  query,
  signalLoading,
}) => {
  console.log("signal page re render");

  const [signalModal, setSignalModal] = useState({ isOpen: false, data: null });

  useEffect(() => {
    signalModal.isOpen && (document.body.style.overflow = "hidden");
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [signalModal.isOpen]);

  const priceHeader = [
    "+1m",
    "+5m",
    "+15m",
    "+30m",
    "+1h",
    "+4h",
    "+6h",
    "+1d",
    "+1w",
  ];

  const columns = useMemo(() => {
    const formatPriceCell = (props, key) => {
      return props.row.original.price && props.row.original[key] ? (
        `${props.row.original[key]}(${props.value}%)`
      ) : (
        <span className="!text-gray-500">-</span>
      );
    };
    const formatPriceAccessor = (row, key) =>
      Math.round((100 - (row.price * 100) / row[key]) * 1e2) / 1e2;

    return [
      {
        Header: "Symbol",
        accessor: "symbol",
        className: "text-center",
        Cell: ({ value, row }) => (
          <span
            onClick={() => setSignalModal({ isOpen: true, data: row.original })}
            className="hover:text-blue-600 cursor-pointer"
          >
            {value.split("/")[0]}
          </span>
        ),
      },
      {
        Header: "Price",
        disableGlobalFilter: true,
        accessor: "price",
        className: "text-center text-yellow-400 ",
        Cell: (props) => parseFloat(props.value).toFixed(6),
        sortMethod: (a, b) => Number(a) - Number(b),
      },
      {
        Header: "+1m",
        disableGlobalFilter: true,
        accessor: (row) => formatPriceAccessor(row, "after_1m_price"),
        Cell: (props) => formatPriceCell(props, "after_1m_price"),
        sortType: "basic",
      },
      {
        Header: "+5m",
        disableGlobalFilter: true,
        accessor: (row) => formatPriceAccessor(row, "after_5m_price"),
        Cell: (props) => formatPriceCell(props, "after_5m_price"),
        sortType: "basic",
      },
      {
        Header: "+15m",
        disableGlobalFilter: true,
        accessor: (row) => formatPriceAccessor(row, "after_15m_price"),
        Cell: (props) => formatPriceCell(props, "after_15m_price"),
        sortType: "basic",
      },
      {
        Header: "+1h",
        disableGlobalFilter: true,
        accessor: (row) => formatPriceAccessor(row, "after_1h_price"),
        Cell: (props) => formatPriceCell(props, "after_1h_price"),
        sortType: "basic",
      },
      {
        Header: "+4h",
        disableGlobalFilter: true,
        accessor: (row) => formatPriceAccessor(row, "after_4h_price"),
        Cell: (props) => formatPriceCell(props, "after_4h_price"),
        sortType: "basic",
      },
      {
        Header: "+6h",
        disableGlobalFilter: true,
        accessor: (row) => formatPriceAccessor(row, "after_6h_price"),
        Cell: (props) => formatPriceCell(props, "after_6h_price"),
        sortType: "basic",
      },
      {
        Header: "+1d",
        disableGlobalFilter: true,
        accessor: (row) => formatPriceAccessor(row, "after_1d_price"),
        Cell: (props) => formatPriceCell(props, "after_1d_price"),
        sortType: "basic",
      },
      {
        Header: "+1w",
        disableGlobalFilter: true,
        sortable: false,
        accessor: (row) => formatPriceAccessor(row, "after_1w_price"),
        Cell: (props) => formatPriceCell(props, "after_1w_price"),
        sortType: "basic",
      },
      {
        Header: "Date",
        accessor: "signals.post_date",
        Cell: (props) => timeFormat("%d-%b-%Y %H:%M")(new Date(props.value)),
      },
      {
        Header: "Signals Channel",
        accessor: "signals",
        Cell: (props) => props.value.channel.name,
      },
    ];
  }, []);
  // useEffect(() => {
  // loadSignal("");
  // }, [isAuthenticated]);
  return (
    <div className="grid grid-cols-4 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 ">
      <div className="col-span-4 z-base md:col-span-2 lg:col-span-3">
        {signalModal.isOpen && (
          <Modal
            label={"Signal Detail"}
            close={() => setSignalModal(false)}
            content={<SignalDetailModal data={signalModal.data} />}
          />
        )}
        <Filter
          onSubmitFilter={(e) => {
            console.log("submit");
            e.preventDefault();
            loadSignal(query);
          }}
        />
        <div className="w-full shadow-lg rounded-lg bg-white mb-4 ">
          <Table
            columns={columns}
            data={signalData}
            getCellProps={(cellInfo) => {
              if (priceHeader.includes(cellInfo.column.Header)) {
                if (cellInfo.value > 0)
                  return {
                    style: { color: `#0E9F6E` },
                  };
                else if (cellInfo.value < 0)
                  return {
                    style: { color: `#E02424` },
                  };
                else {
                  return {
                    style: { color: `#6B7280` },
                  };
                }
              } else {
                return {
                  style: {},
                };
              }
            }}
            signalLoading={signalLoading}
          />
        </div>
      </div>
      <div className="col-span-4 md:col-span-1"></div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  query: state.signal.query,
  signalData: state.signal.data,
  signalLoading: state.signal.loading,
});

const mapDispatchtoProps = (dispatch) => ({
  loadSignal: (query) => dispatch(loadSignal(query)),
});

export default connect(mapStateToProps, mapDispatchtoProps)(SignalPage);
