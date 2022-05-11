import { useCallback, useEffect, useMemo, useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import {
	useFlexLayout,
	usePagination,
	useResizeColumns,
	useSortBy,
	useTable,
	useGlobalFilter,
	useAsyncDebounce,
} from "react-table";
import { matchSorter } from "match-sorter";
const defaultPropGetter = () => ({});

const Table = ({
	columns,
	data,
	getHeaderProps = defaultPropGetter,
	getColumnProps = defaultPropGetter,
	getRowProps = defaultPropGetter,
	getCellProps = defaultPropGetter,
}) => {
	const defaultColumn = useMemo(
		() => ({
			minWidth: 30,
			width: 120,
			maxWidth: 400,
		}),
		[]
	);
	const filterTypes = useMemo(
		() => ({
			fuzzyText: fuzzyTextFilterFn,
			text: (rows, id, filterValue) => {
				return rows.filter((row) => {
					const rowValue = row.values[id];
					return rowValue !== undefined
						? String(rowValue)
							.toLowerCase()
							.startsWith(String(filterValue).toLowerCase())
						: true;
				});
			}
		}),
		[]
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		prepareRow,

		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state,
		visibleColumns,
		preGlobalFilteredRows,
		setGlobalFilter,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data: data.results,
			defaultColumn,
			autoResetSortBy: false,
			filterTypes,
		},
		useGlobalFilter,
		useSortBy,
		useResizeColumns,
		useFlexLayout,
		usePagination,
	);
	return (
		<div className="w-full rounded-lg p-6">
			<div className="flex items-center justify-between pb-6">
				<div className="font-medium text-gray-400 text-sm">
					Loaded {data.results.length}{" "}
					results from {data.count} records
				</div>
				<GlobalFilter
					preGlobalFilteredRows={preGlobalFilteredRows}
					globalFilter={state.globalFilter}
					setGlobalFilter={setGlobalFilter}
				/>
			</div>
			<div className="overflow-auto w-full">
				<table className="table bg-white shadow" {...getTableProps()}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th
										className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900"
										{...column.getHeaderProps(
											column.getSortByToggleProps()
										)}
									>
										{column.render("Header")}
										<div
											{...column.getResizerProps()}
											className={`resizer ${column.isResizing
												? "isResizing"
												: ""
												}`}
											onClick={(e) => {
												e.preventDefault();
												e.stopPropagation();
											}}
										/>
										{column.isSorted ? (
											column.isSortedDesc ? (
												<TiArrowSortedDown className="inline text-gray-400" />
											) : (
												<TiArrowSortedUp className="inline text-gray-400" />
											)
										) : (
											""
										)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{page.map((row, rowIndex) => {
							prepareRow(row);
							const rowProps = row.getRowProps();
							return (
								<>
									<tr
										key={rowIndex}
										{...rowProps}
										className=" "
									>
										{row.cells.map((cell, cellIndex) => {
											return (
												<td
													key={cellIndex}
													className="border p-4 dark:border-dark-5 overflow-hidden"
													{...cell.getCellProps([
														{
															className:
																cell.column
																	.className,
															style: cell.column
																.style,
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
								</>
							);
						})}
					</tbody>
				</table>
			</div>
			<div className="btn-group mt-2">
				<button className="btn"
					onClick={() => gotoPage(0)}
					disabled={!canPreviousPage}
				>
					{"<<"}
				</button>{" "}
				<button className="btn"
					onClick={() => previousPage()}
					disabled={!canPreviousPage}
				>
					{"<"}
				</button>{" "}
				<button className="btn">
					Page
					<strong className="ml-1">
						{data.count ? pageIndex + 1 : 0} of {pageOptions.length}
					</strong>{" "}
				</button>
				<button className="btn" onClick={() => nextPage()} disabled={!canNextPage}>
					{">"}
				</button>{" "}
				<button className="btn"
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
	);
};


export const GlobalFilter = ({
	preGlobalFilteredRows,
	globalFilter,
	setGlobalFilter,
}) => {
	// const count = preGlobalFilteredRows?.length || 0
	const count = preGlobalFilteredRows?.length || 0
	const [value, setValue] = useState(globalFilter)
	const onChange = useAsyncDebounce(value => {
		setGlobalFilter(value || undefined)
	}, 200)

	return (
		<div className="relative">
			<div className="absolute flex items-center ml-4 h-full">
				<svg className="w-4 h-4 fill-current text-primary-gray-dark" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
				</svg>
			</div>

			<input
				value={value || ""}
				onChange={e => {
					setValue(e.target.value);
					onChange(e.target.value);
				}}
				placeholder={`Search ${count} records...`}
				className="pl-10 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm" />
		</div>)
}

function fuzzyTextFilterFn(rows, id, filterValue) {
	return { matchSorter }(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

export default Table;