import { useMemo } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import {
	useFlexLayout,
	usePagination,
	useResizeColumns,
	useSortBy,
	useTable
} from "react-table";

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
			width: 200,
			maxWidth: 400,
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
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data: data.results,
			defaultColumn,
			autoResetSortBy: false,
			// initialState: { pageIndex: 0 },
		},
		useSortBy,
		useResizeColumns,
		useFlexLayout,
		usePagination
	);

	return (
		<div className="w-full rounded-lg p-6">
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
							);
						})}
					</tbody>
				</table>
			</div>
			<div className="flex pt-6 justify-between">
				<div className="">
					Showing the first {data.count < 20 ? data.count : 20}{" "}
					results of {data.count} rows
				</div>
				<div className="btn-group">
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
					<span className="btn">
						Page{" "}
						<strong className="ml-1">
							{data.count ? pageIndex + 1 : 0} of {pageOptions.length}
						</strong>{" "}
					</span>
					<button className="btn" onClick={() => nextPage()} disabled={!canNextPage}>
						{">"}
					</button>{" "}
					<button className="btn"
						onClick={() => gotoPage(pageCount - 1)}
						disabled={!canNextPage}
					>
						{">>"}
					</button>{" "}
				</div>
			</div>
		</div>
	);
};

export default Table;