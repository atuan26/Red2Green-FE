import { useEffect, useMemo, useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import Skeleton from "react-loading-skeleton";
import {
	useExpanded,
	useFlexLayout,
	usePagination,
	useResizeColumns,
	useSortBy,
	useTable,
} from "react-table";
import ChartComponent from "../../Other/Chart/Chart2";
import TelegramPost from "../../Other/TelegramWidget";
const defaultPropGetter = () => ({});

const Table = ({
	columns,
	data,
	getHeaderProps = defaultPropGetter,
	getColumnProps = defaultPropGetter,
	getRowProps = defaultPropGetter,
	getCellProps = defaultPropGetter,
	renderRowSubComponent,
}) => {
	const defaultColumn = useMemo(
		() => ({
			minWidth: 30,
			width: 120,
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
		visibleColumns,
		state: { pageIndex, pageSize, expanded },
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
		useExpanded,
		usePagination,
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
							const rowProps = row.getRowProps();
							return (
								<>
									<tr
										className="text-gray-700 hover:!bg-gray-500 dark:hover:!bg-gray-700"
										{...rowProps}
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
									{row.isExpanded &&
										renderRowSubComponent({ row, rowProps, visibleColumns })}
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
				<btn className="btn">
					Page
					<strong className="ml-1">
						{data.count ? pageIndex + 1 : 0} of {pageOptions.length}
					</strong>{" "}
				</btn>
				<button className="btn" onClick={() => nextPage()} disabled={!canNextPage}>
					{">"}
				</button>{" "}
				<button className="btn"
					onClick={() => gotoPage(pageCount - 1)}
					disabled={!canNextPage}
				>
					{">>"}
				</button>{" "}
				<span className="hidden">
					| Go to page:{" "}
					<input
						type="number"
						defaultValue={pageIndex + 1}
						onChange={(e) => {
							const page = e.target.value
								? Number(e.target.value) - 1
								: 0;
							gotoPage(page);
						}}
						style={{ width: "100px" }}
					/>
				</span>{" "}
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

export const SubRowAsync = ({ row, rowProps, visibleColumns }) => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 1500);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	return (
		<SubRows
			row={row}
			rowProps={rowProps}
			visibleColumns={visibleColumns}
			loading={loading}
		/>
	);
}
export const SubRows = ({ row, rowProps, visibleColumns, loading }) => {
	if (loading) {
		return (
			<tr>
				<td
					colSpan={visibleColumns.length}
					className='flex pl-0 gap-10'
				>
					<Skeleton height="400px" width="300px" />
					<Skeleton height="400px" width="750px" />
				</td>
			</tr>
		);
	}

	return (
		<tr className="flex">
			<td className="p-0" />
			<td
				colSpan={visibleColumns.length}
				className='flex pl-0 gap-10'
			>
				<div>
					<TelegramPost
						channel={row.original.signals.channel.username}
						postID={row.original.signals.post_id}
						userPic="true"
						width="300px"
					// dark='1'
					/>
				</div>
				<div className="w-[750px] h-[400px]">
					<ChartComponent
						symbol={row.original.symbol}
						exchange={row.original.exchange}
						since={row.original.signals.post_date}
					/>
				</div>
				{console.log(row.original)}
			</td>
		</tr>
	);
}

export default Table;