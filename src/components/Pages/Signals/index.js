import React, { useEffect, useState } from "react";
import Table, { } from "./Table";
import api from "../../../redux/actions";
import Filter from "./Filter2";
import { connect } from "react-redux";
import { timeFormat } from "d3-time-format";
import { Modal } from "../../Other/Modal";
import SignalDetailModal from "./SignalDetailModal";

const App = ({ isAuthenticated }) => {
	const [data, setData] = useState({ count: 0, results: [] });
	const [signalModal, setSignalModal] = useState({ isOpen: false, data: null });

	useEffect(() => {
		signalModal && (document.body.style.overflow = 'hidden')
		return () => {
			document.body.style.overflow = 'unset';
		}
	}, [signalModal]);

	useEffect(() => {
		api.get("/price_data/?signals__post_date__gte=")
			.then((result) => {
				setData(result.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [isAuthenticated]);

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
	const columns = React.useMemo(
		() => [
			{
				Header: "Symbol",
				accessor: "symbol",
				className: "text-center !sticky !left-0",
				Cell: ({ value, row, }) => (
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
				accessor: "price",
				className: "text-center text-yellow-400 ",
				Cell: (props) => parseFloat(props.value),
				sortMethod: (a, b) => Number(a) - Number(b),
			},
			{
				Header: "+1m",
				accessor: (row) =>
					Math.round(
						(100 - (row.price * 100) / row.after_1m_price) *
						1e2
					) / 1e2,
				Cell: (props) =>
					props.row.original.price
						? `${props.row.original.after_1m_price}(${props.value}%)`
						: "null",
				sortType: "basic",
			},
			{
				Header: "+5m",
				accessor: (row) =>
					Math.round(
						(100 - (row.price * 100) / row.after_5m_price) *
						1e2
					) / 1e2,
				Cell: (props) =>
					props.row.original.price
						? `${props.row.original.after_5m_price}(${props.value}%)`
						: "null",
				sortType: "basic",
			},
			{
				Header: "+15m",
				accessor: (row) =>
					Math.round(
						(100 - (row.price * 100) / row.after_15m_price) *
						1e2
					) / 1e2,
				Cell: (props) =>
					props.row.original.price
						? `${props.row.original.after_15m_price}(${props.value}%)`
						: "null",
				sortType: "basic",
			},
			{
				Header: "+1h",
				accessor: (row) =>
					Math.round(
						(100 - (row.price * 100) / row.after_1h_price) *
						1e2
					) / 1e2,
				Cell: (props) =>
					props.row.original.price
						? `${props.row.original.after_1h_price}(${props.value}%)`
						: "null",
				sortType: "basic",
			},
			{
				Header: "+4h",
				accessor: (row) =>
					Math.round(
						(100 - (row.price * 100) / row.after_4h_price) *
						1e2
					) / 1e2,
				Cell: (props) =>
					props.row.original.price
						? `${props.row.original.after_4h_price}(${props.value}%)`
						: "null",
				sortType: "basic",
			},
			{
				Header: "+6h",
				accessor: (row) =>
					Math.round(
						(100 - (row.price * 100) / row.after_6h_price) *
						1e2
					) / 1e2,
				Cell: (props) =>
					props.row.original.price
						? `${props.row.original.after_6h_price}(${props.value}%)`
						: "null",
				sortType: "basic",
			},
			{
				Header: "+1d",
				accessor: (row) =>
					Math.round(
						(100 - (row.price * 100) / row.after_1d_price) *
						1e2
					) / 1e2,
				Cell: (props) =>
					props.row.original.price
						? `${props.row.original.after_1d_price}(${props.value}%)`
						: "null",
				sortType: "basic",
			},
			{
				Header: "+1w",
				accessor: (row) =>
					Math.round(
						(100 - (row.price * 100) / row.after_1w_price) *
						1e2
					) / 1e2,
				Cell: (props) =>
					props.row.original.price
						? `${props.row.original.after_1w_price}(${props.value}%)`
						: "null",
				sortType: "basic",
			},
			{
				Header: "Date",
				accessor: "signals.post_date",
				Cell: (props) => timeFormat("%d-%b-%Y %H:%M")(new Date(props.value))
			},
			{
				Header: "Signals Channel",
				accessor: "signals",
				Cell: (props) => props.value.channel.name
			},
		],
		[]
	);
	return (
		<>
			{signalModal.isOpen &&
				<Modal
					label={"Signal Detail"}
					close={() => setSignalModal(false)}
					content={<SignalDetailModal data={signalModal.data} />}
				/>
			}
			<Filter />
			<div className="w-full shadow-lg rounded-lg bg-white mb-4 ">
				<div className="p-6 pb-0">
					Showing the first {data.count < 20 ? data.count : 20}{" "}
					results of {data.count} rows
				</div>
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

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchtoProps = (dispatch) => ({
	// loadTask: () => dispatch(loadTask()),
	// loadEvent: () => dispatch(loadEvent()),
});

export default connect(mapStateToProps, mapDispatchtoProps)(App);

