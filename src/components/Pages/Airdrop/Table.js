// import { matchSorter } from "match-sorter";
import { useMemo, useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import Skeleton from "react-loading-skeleton";
import { GrStackOverflow } from "react-icons/gr";
import { CgAdd } from "react-icons/cg";
import { GiBoxUnpacking } from "react-icons/gi";
import { HiOutlineGift } from "react-icons/hi";
import { BiBox } from "react-icons/bi";
import {
  useFilters,
  useFlexLayout,
  usePagination,
  useResizeColumns,
  useSortBy,
  useTable,
} from "react-table";
import AirdropModalForm from "../../Other/Modal/AirdropModalForm";

const defaultPropGetter = () => ({});

const Table = ({
  columns,
  data,
  getHeaderProps = defaultPropGetter,
  getColumnProps = defaultPropGetter,
  getRowProps = defaultPropGetter,
  getCellProps = defaultPropGetter,
  airdropLoading: [airdropLoading, setAirdropLoading],
  showAirdropFormModal,
}) => {
  const defaultColumn = useMemo(
    () => ({
      minWidth: 30,
      // width: 200,
      maxWidth: 400,
    }),
    []
  );
  const tableData = useMemo(
    () => (airdropLoading ? Array(50).fill({}) : data.results),
    [airdropLoading, data.results]
  );
  const tableColumns = useMemo(
    () =>
      airdropLoading
        ? columns.map((column) => ({
            ...column,
            Cell: <Skeleton />,
          }))
        : columns,
    [airdropLoading, columns]
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    // setFilter,
    setAllFilters,

    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      // columns,
      // data: data.results,
      columns: tableColumns,
      data: tableData,
      defaultColumn,
      // filterTypes,
      autoResetSortBy: false,
      // initialState: { pageIndex: 0 },
    },
    useFilters,
    useSortBy,
    useResizeColumns,
    useFlexLayout,
    usePagination
  );
  return (
    <>
      <AirdropModalForm />
      <div className="flex p-6 pb-0 gap-4 items-start w-full">
        <div
          onClick={() => {
            showAirdropFormModal(true);
          }}
          className="flex items-center  text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 cursor-pointer"
        >
          <CgAdd className="inline h-5 w-5 mr-1" />
          New airdrop
        </div>
        <button
          onClick={() => setAllFilters([])}
          className="flex items-center  px-4 py-2 text-white rounded-full bg-gray-700 hover:bg-gray-600"
        >
          <GrStackOverflow className="w-5 h-5 text-white inline mr-2" />
          All Airdrops
        </button>
        <button
          onClick={() => setAllFilters([{ id: "status", value: 1 }])}
          className="flex items-center  px-4 py-2 text-gray-600 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <GiBoxUnpacking className="w-5 h-5 text-yellow-400 inline mr-2" />
          Ongoing
        </button>
        <button
          onClick={() => setAllFilters([{ id: "status", value: 2 }])}
          className="flex items-center px-4 py-2 text-gray-600 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <BiBox className="w-5 h-5 text-red-400 inline mr-2" />
          Ended
        </button>
        <button
          onClick={() => setAllFilters([{ id: "is_distributed", value: true }])}
          className="flex items-center px-4 py-2 text-gray-600 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <HiOutlineGift className="w-5 h-5 text-green-400 inline mr-2" />
          Distributed
        </button>
      </div>
      <div className="w-full rounded-lg p-6">
        <div className="overflow-auto w-full">
          <table className="table bg-white shadow w-full" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <TiArrowSortedDown className="inline text-gray-400" />
                        ) : (
                          <TiArrowSortedUp className="inline text-gray-400" />
                        )
                      ) : (
                        ""
                      )}
                      <div
                        {...column.getResizerProps()}
                        className={`resizer ${
                          column.isResizing ? "isResizing" : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      />
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr
                    className="text-gray-700 hover:!bg-gray-500 dark:hover:!bg-gray-700"
                    {...row.getRowProps()}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td
                          className="border p-4 dark:border-dark-5 overflow-hidden"
                          {...cell.getCellProps([
                            {
                              className: cell.column.className,
                              style: cell.column.style,
                            },
                            getCellProps(cell),
                            getColumnProps(cell),
                          ])}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex pt-6 justify-between">
          <div className="">
            Show {page.length} results of {data.count} records
          </div>
          <div className="btn-group">
            <button
              className="btn"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </button>{" "}
            <button
              className="btn"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {"<"}
            </button>{" "}
            <span className="btn">
              Page{" "}
              <strong className="ml-1">
                {data.count ? pageIndex + 1 : 0} of {pageOptions.length}
              </strong>{" "}
            </span>
            <button
              className="btn"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              {">"}
            </button>{" "}
            <button
              className="btn"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>{" "}
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};
export default Table;
