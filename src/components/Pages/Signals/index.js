import React, { useEffect, useState } from "react";
import Table from "./Table";
import FilterForm from "./FilterForm";
import api from "../../../redux/actions";

const App = () => {
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
	const [data, setData] = useState([]);

	const columns = React.useMemo(
		() => [
			{
				Header: "Symbol",
				accessor: "symbol",
				className: "text-center",
				Cell: (props) => props.value.split("/")[0],
			},
			{
				Header: "Index price",
				accessor: "index_price",
				className: "text-center text-yellow-400 ",
				Cell: (props) => {
					console.log(typeof parseFloat(props.value));
					return parseFloat(props.value);
				},
				sortMethod: (a, b) => Number(a) - Number(b),
				// sortMethod:
			},
			{
				Header: "+1m",
				accessor: (row) =>
					Math.round(
						(100 - (row.index_price * 100) / row.after_1m_price) *
							1e2
					) / 1e2,
				Cell: (props) =>
					props.row.original.index_price
						? `${props.row.original.after_1m_price}(${props.value}%)`
						: "null",
				sortType: "basic",
			},
			{
				Header: "+5m",
				accessor: (row) =>
					Math.round(
						(100 - (row.index_price * 100) / row.after_5m_price) *
							1e2
					) / 1e2,
				Cell: (props) =>
					props.row.original.index_price
						? `${props.row.original.after_5m_price}(${props.value}%)`
						: "null",
				sortType: "basic",
			},
			{
				Header: "+15m",
				accessor: (row) =>
					Math.round(
						(100 - (row.index_price * 100) / row.after_15m_price) *
							1e2
					) / 1e2,
				Cell: (props) =>
					props.row.original.index_price
						? `${props.row.original.after_15m_price}(${props.value}%)`
						: "null",
				sortType: "basic",
			},
			{
				Header: "+1h",
				accessor: (row) =>
					Math.round(
						(100 - (row.index_price * 100) / row.after_1h_price) *
							1e2
					) / 1e2,
				Cell: (props) =>
					props.row.original.index_price
						? `${props.row.original.after_1h_price}(${props.value}%)`
						: "null",
				sortType: "basic",
			},
			{
				Header: "+4h",
				accessor: (row) =>
					Math.round(
						(100 - (row.index_price * 100) / row.after_4h_price) *
							1e2
					) / 1e2,
				Cell: (props) =>
					props.row.original.index_price
						? `${props.row.original.after_4h_price}(${props.value}%)`
						: "null",
				sortType: "basic",
			},
			{
				Header: "+6h",
				accessor: (row) =>
					Math.round(
						(100 - (row.index_price * 100) / row.after_6h_price) *
							1e2
					) / 1e2,
				Cell: (props) =>
					props.row.original.index_price
						? `${props.row.original.after_6h_price}(${props.value}%)`
						: "null",
				sortType: "basic",
			},
			{
				Header: "+1d",
				accessor: (row) =>
					Math.round(
						(100 - (row.index_price * 100) / row.after_1d_price) *
							1e2
					) / 1e2,
				Cell: (props) =>
					props.row.original.index_price
						? `${props.row.original.after_1d_price}(${props.value}%)`
						: "null",
				sortType: "basic",
			},
			{
				Header: "+1w",
				accessor: (row) =>
					Math.round(
						(100 - (row.index_price * 100) / row.after_1w_price) *
							1e2
					) / 1e2,
				Cell: (props) =>
					props.row.original.index_price
						? `${props.row.original.after_1w_price}(${props.value}%)`
						: "null",
				sortType: "basic",
			},
			{
				Header: "Date",
				accessor: "signals.post_date",
				Cell: (props) =>
					`${new Date(props.value).toLocaleDateString()} ${new Date(
						props.value
					).toLocaleTimeString()}`,
				// sortType: (a, b) => {
				// 	var a1 = new Date(a).getTime();
				// 	var b1 = new Date(b).getTime();
				// 	if (a1 < b1) return 1;
				// 	else if (a1 > b1) return -1;
				// 	else return 0;
				// },
			},
			{
				Header: "Signals Channel",
				accessor: "signals.channel.name",
			},
		],
		[]
	);

	useEffect(() => {
		api.get("/price_data/?signals__post_date__gte=")
			.then((result) => {
				setData(result.data.results);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const setDatas = (data) => setData(data);

	return (
		<>
			<FilterForm setData={setDatas} />
			<div className="w-full shadow-lg rounde2xl bg-white mb-4 ">
				<Table
					columns={columns}
					data={data}
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
				/>
			</div>
		</>
	);
};

export default App;
