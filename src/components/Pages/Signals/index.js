import React, { useEffect, useState } from "react";
import Table, { } from "./Table";
import api from "../../../redux/actions";
import Filter from "./Filter2";
import { connect } from "react-redux";
import { timeFormat } from "d3-time-format";
import { Modal } from "../../Other/Modal";
import SignalDetailModal from "./SignalDetailModal";
import { DateRangePicker } from "../../Other/DateTimePicker";

const App = ({ isAuthenticated }) => {
	const [data, setData] = useState({ count: 0, results: [] });
	const [signalModal, setSignalModal] = useState({ isOpen: false, data: null });

	useEffect(() => {
		signalModal.isOpen && (document.body.style.overflow = 'hidden')
		console.log('### document.body.style.overflow :', document.body.style.overflow)
		return () => {
			document.body.style.overflow = 'unset';
			console.log('### document.body.style.overflow :', document.body.style.overflow)
		}
	}, [signalModal.isOpen]);

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
				className: "text-center",// !sticky !left-0",
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
		<div className="grid grid-cols-4 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 ">
			<div className="col-span-4 z-base md:col-span-2 lg:col-span-3">
				{signalModal.isOpen &&
					<Modal
						label={"Signal Detail"}
						close={() => setSignalModal(false)}
						content={<SignalDetailModal data={signalModal.data} />}
					/>
				}
				<Filter />
				<div className="w-full shadow-lg rounded-lg bg-white mb-4 ">
					<div className="flex items-center justify-between p-6 pb-0">
						<div className="font-medium text-gray-400 text-sm">
							Showing {data.count < 20 ? data.count : 20}{" "}
							results of {data.count} rows
						</div>
						<div className="relative">
							<div className="absolute flex items-center ml-4 h-full">
								<svg className="w-4 h-4 fill-current text-primary-gray-dark" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
								</svg>
							</div>

							<input type="text" placeholder="Search ..." className="pl-10 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm" />
						</div>
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
			</div>
			<div className="col-span-4 md:col-span-1"></div>
		</div>
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

