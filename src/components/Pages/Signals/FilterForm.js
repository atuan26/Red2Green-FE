import DatePicker from "react-datepicker";
import React, { useState } from "react";
import api from "../../../redux/actions";

const FilterForm = ({ setData }) => {
	const handleSubmit = (event) => {
		event.preventDefault();
		let query = [];
		for (let v of event.target) {
			if (v.id && v.value.trim()) query.push(v.id + "=" + v.value.trim());
		}
		query = "?" + query.join("&");
		api.get("/price_data/" + query)
			.then((res) => {
				console.log(res.data);
				setData(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<form
			onSubmit={handleSubmit}
			className="w-full shadow-lg rounded-2xl bg-white mb-4 "
		>
			<div className="w-full p-4 flex justify-center pb-0">
				<InputFilter
					label="Signal Channel"
					name="signals__channel__name__icontains"
					placeholder="Binance Announcements, ..."
				/>
				<InputFilter
					label="Signal Content"
					name="signals__content__icontains"
					placeholder="Any keywork"
				/>
				<InputFilter
					label="Symbol"
					name="symbol__base__symbol__iexact"
					placeholder="BTC, ETH, BNB,..."
				/>
				<InputFilter
					label="Exchange"
					name="exchange__name__icontains"
					placeholder="Binance, MEXC, Houbi, ..."
				/>
				<InputFilter
					label="From"
					datePicker={true}
					selected={true}
					name="signals__post_date__gte"
				/>
				<InputFilter
					label="To"
					datePicker={true}
					name="signals__post_date__lte"
				/>
			</div>
			<div className="w-full flex justify-center">
				<button
					type="submit"
					className="m-4 mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					Search
				</button>
			</div>
		</form>
	);
};

const InputFilter = ({
	label,
	onChange,
	name,
	placeholder,
	datePicker,
	selected,
}) => {
	const [startDate, setStartDate] = useState(
		new Date().setHours(0, 0, 0, 0) - 604800000
	);
	return (
		// <div className="mb-6">
		<div className="w-1/2 px-4">
			<label
				htmlFor={name}
				className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
			>
				{label}
			</label>
			{datePicker ? (
				<DatePicker
					id={name}
					selected={
						selected ? startDate : new Date().setHours(0, 0, 0, 0)
					}
					value={selected}
					onChange={(date) => setStartDate(date)}
					dateFormat="Y-M-d hh:mm:ss"
					placeholderText={new Date(startDate).toLocaleDateString()}
					className=" block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				/>
			) : (
				<input
					id={name}
					type="text"
					onChange={onChange}
					className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
					placeholder={placeholder}
					required=""
				/>
			)}
		</div>
	);
};

export default FilterForm;
