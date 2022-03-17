import { Route, Routes } from "react-router-dom";

import Header from "./components/Layout/Header";
import Navbar from "./components/Layout/Navbar2";
// import Footer from "./components/Layout/Footer";
import Footer from "./components/Layout/Footer/Footer5";
import Other from "./components/Other";
import Template1 from "./Template/T1";

import Dashboard from "./components/Pages/Dashboard";
import CalendarEvent from "./components/Pages/Calendar";
import Signals from "./components/Pages/Signals";

import Table from "./components/Other/Table";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

function App() {
	const data = [
		{
			id: 1,
			first_name: "Agace",
			last_name: "Petrovic",
			email: "apetrovic0@cloudflare.com",
			gender: "Male",
			ip_address: "165.158.174.241",
		},
		{
			id: 2,
			first_name: "Beret",
			last_name: "Warlock",
			email: "bwarlock1@hud.gov",
			gender: "Female",
			ip_address: "152.132.55.234",
		},
		{
			id: 3,
			first_name: "Martie",
			last_name: "Yellep",
			email: "myellep2@e-recht24.de",
			gender: "Male",
			ip_address: "41.151.111.103",
		},
		{
			id: 4,
			first_name: "Korella",
			last_name: "Fowls",
			email: "kfowls3@admin.ch",
			gender: "Female",
			ip_address: "253.139.192.159",
		},
		{
			id: 5,
			first_name: "Toni",
			last_name: "Zoane",
			email: "tzoane4@google.com",
			gender: "Male",
			ip_address: "94.77.94.95",
		},
		{
			id: 6,
			first_name: "Gilberte",
			last_name: "Mollin",
			email: "gmollin5@paginegialle.it",
			gender: "Male",
			ip_address: "14.193.121.142",
		},
		{
			id: 7,
			first_name: "Jody",
			last_name: "Mears",
			email: "jmears6@oaic.gov.au",
			gender: "Male",
			ip_address: "134.186.171.137",
		},
		{
			id: 8,
			first_name: "Suki",
			last_name: "Allibon",
			email: "sallibon7@barnesandnoble.com",
			gender: "Female",
			ip_address: "18.228.155.38",
		},
		{
			id: 9,
			first_name: "Harland",
			last_name: "Oneil",
			email: "honeil8@freewebs.com",
			gender: "Female",
			ip_address: "239.224.30.181",
		},
		{
			id: 10,
			first_name: "Vidovik",
			last_name: "Ives",
			email: "vives9@google.de",
			gender: "Female",
			ip_address: "1.255.29.43",
		},
		{
			id: 11,
			first_name: "Joletta",
			last_name: "Halloway",
			email: "jhallowaya@phpbb.com",
			gender: "Female",
			ip_address: "245.0.1.1",
		},
		{
			id: 12,
			first_name: "Kendal",
			last_name: "Goodacre",
			email: "kgoodacreb@japanpost.jp",
			gender: "Male",
			ip_address: "108.215.255.215",
		},
		{
			id: 13,
			first_name: "Selie",
			last_name: "Beeby",
			email: "sbeebyc@dell.com",
			gender: "Male",
			ip_address: "161.27.34.160",
		},
		{
			id: 14,
			first_name: "Marieann",
			last_name: "Forsdicke",
			email: "mforsdicked@howstuffworks.com",
			gender: "Male",
			ip_address: "237.164.165.123",
		},
		{
			id: 15,
			first_name: "Lotti",
			last_name: "Sorey",
			email: "lsoreye@washington.edu",
			gender: "Male",
			ip_address: "152.240.128.73",
		},
		{
			id: 16,
			first_name: "Humbert",
			last_name: "Folkerd",
			email: "hfolkerdf@ycombinator.com",
			gender: "Bigender",
			ip_address: "97.46.29.189",
		},
		{
			id: 17,
			first_name: "Atlanta",
			last_name: "Gaither",
			email: "agaitherg@storify.com",
			gender: "Male",
			ip_address: "13.216.143.12",
		},
		{
			id: 18,
			first_name: "Muire",
			last_name: "Trenaman",
			email: "mtrenamanh@plala.or.jp",
			gender: "Bigender",
			ip_address: "121.237.150.52",
		},
		{
			id: 19,
			first_name: "Mariam",
			last_name: "Vell",
			email: "mvelli@nifty.com",
			gender: "Female",
			ip_address: "69.55.42.218",
		},
		{
			id: 20,
			first_name: "Myrle",
			last_name: "Harlow",
			email: "mharlowj@live.com",
			gender: "Male",
			ip_address: "46.94.76.67",
		},
	];
	return (
		<div className=" bg-gray-100 dark:bg-gray-800 w-full min-h-screen">
			{/* <div className="flex items-start justify-between"> */}
			<Navbar />
			<div className="absolute left-56 w-[calc(100%-14rem)]  min-h-screen flex flex-col  pl-4 md:p-4 md:space-y-4  max-w-[2560px]">
				<Header />
				<Routes>
					<Route path="/r2g/" element={<Dashboard />} />
					<Route path="/r2g/calendar" element={<CalendarEvent />} />
					<Route path="/r2g/signals" element={<Signals />} />
					<Route
						path="/r2g/airdrop"
						element={
							<Table
								title="Airdrop"
								hasFilter={true}
								data={data}
							/>
						}
					/>
					<Route
						path="/r2g/account"
						element={
							<Table
								title="Account"
								hasFilter={true}
								data={data}
							/>
						}
					/>
					<Route
						path="/r2g/user"
						element={
							<Table title="User" hasFilter={true} data={data} />
						}
					/>
					<Route path="/r2g/api" element={<Template1 />} />
					<Route
						path="*"
						element={
							<main
								style={{ padding: "1rem" }}
								className="bg-white w-full min-h-[80vh] rounded-lg shadow-lg"
							>
								<p>There's nothing here!</p>
							</main>
						}
					/>
				</Routes>
				<Footer />
			</div>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
		</div>
	);
}

export default App;
