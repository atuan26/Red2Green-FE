import { useCallback, useEffect, useMemo, useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import Skeleton from "react-loading-skeleton";
import { GrStackOverflow } from "react-icons/gr";
import { GiBoxUnpacking } from "react-icons/gi";
import { HiOutlineGift } from "react-icons/hi";
import { BiBox } from "react-icons/bi";
import {
  useAsyncDebounce,
  useFilters,
  useFlexLayout,
  useGlobalFilter,
  usePagination,
  useResizeColumns,
  useSortBy,
  useTable,
} from "react-table";

const defaultPropGetter = () => ({});

const Table = ({
  columns,
  data,
  getHeaderProps = defaultPropGetter,
  getColumnProps = defaultPropGetter,
  getRowProps = defaultPropGetter,
  getCellProps = defaultPropGetter,
  airdropLoading: [airdropLoading, setAirdropLoading],
}) => {
  const defaultColumn = useMemo(
    () => ({
      minWidth: 30,
      maxWidth: 400,
    }),
    []
  );
  const [activeFilterButton, setActiveFilterButton] = useState(0);
  const sleep = useCallback(
    (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
    []
  );
  const aysncFilter = useCallback(async (query) => {
    setAirdropLoading(true);
    await sleep(300);
    setAirdropLoading(false);
    setAllFilters(query);
  }, []);
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
    state,
    // visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
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
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useResizeColumns,
    useFlexLayout,
    usePagination
  );
  const filterQuery = useMemo(
    () => [
      [],
      [{ id: "status", value: 1 }],
      [{ id: "status", value: 2 }],
      [{ id: "is_distributed", value: true }],
    ],
    []
  );
  useEffect(() => {
    aysncFilter(filterQuery[activeFilterButton]);
  }, [activeFilterButton]);
  useEffect(() => {
    setAllFilters(filterQuery[activeFilterButton]);
  }, [data]);
  return (
    <>
      <div className=" py-4 gap-4  w-full">
        <div className="flex">
          <div className="flex items-start w-full gap-4  flex-wrap">
            <FilterButton
              index={0}
              onFilter={() => {
                setActiveFilterButton(0);
              }}
              isActive={activeFilterButton === 0}
            />
            <FilterButton
              index={1}
              onFilter={() => {
                setActiveFilterButton(1);
              }}
              isActive={activeFilterButton === 1}
            />
            <FilterButton
              index={2}
              onFilter={() => {
                setActiveFilterButton(2);
              }}
              isActive={activeFilterButton === 2}
            />
            <FilterButton
              index={3}
              onFilter={() => {
                setActiveFilterButton(3);
              }}
              isActive={activeFilterButton === 3}
            />
          </div>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </div>
      </div>
      <div className="w-full rounded-lg py-2">
        <div className="overflow-auto w-full">
          <table
            className="w-full text-sm text-left text-gray-700 dark:text-gray-400"
            {...getTableProps()}
          >
            <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                  <tr {...row.getRowProps(getRowProps(row))}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps([
                            {
                              className: "px-6 py-4 " + cell.column.className,
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

const FilterButton = ({ index, onFilter, isActive }) => {
  const buttonIndex = useMemo(
    () => [
      {
        label: "All Airdrops",
        icon: <GrStackOverflow className="w-5 h-5 text-blue-400 inline mr-2" />,
      },
      {
        icon: (
          <GiBoxUnpacking className="w-5 h-5 text-yellow-400 inline mr-2" />
        ),
        label: "Ongoing",
      },
      {
        icon: <BiBox className="w-5 h-5 text-red-400 inline mr-2" />,
        label: "Ended",
      },
      {
        icon: <HiOutlineGift className="w-5 h-5 text-green-400 inline mr-2" />,
        label: "Distributed",
      },
    ],
    []
  );
  return (
    <>
      <button
        onClick={onFilter}
        className={
          isActive
            ? "flex items-center  px-4 py-2 text-white rounded-full bg-gray-700 hover:bg-gray-600"
            : "flex items-center px-4 py-2 text-gray-600 rounded-full bg-gray-100 hover:bg-gray-200"
        }
      >
        {buttonIndex[index].icon}
        {buttonIndex[index].label}
      </button>
    </>
  );
};

export const GlobalFilter = (props) => {
  const { preGlobalFilteredRows, globalFilter, setGlobalFilter } = props;
  const count = preGlobalFilteredRows?.length || 0;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className="relative">
      <div className="absolute flex items-center ml-4 h-full">
        <svg
          className="w-4 h-4 fill-current text-primary-gray-dark"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
        </svg>
      </div>

      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Search ${count} records...`}
        className="pl-10 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
      />
    </div>
  );
};
export default Table;
