import React, { useEffect } from "react";
import { connect } from "react-redux";
import CalendarEvent from "./CalEvent";
import MarketStat from "./MarketStat";
import TaskList from "./TaskList/index.js";
import { loadEvent } from "../../../redux/actions/eventAction";
import { loadTask } from "../../../redux/actions/taskAction";

const Content = ({ isAuthenticated, loadTask, loadEvent }) => {
	useEffect(() => {
		if (isAuthenticated) {
			loadTask();
			loadEvent();
		}
	}, [isAuthenticated, loadEvent, loadTask]);
	return (
		<div className="grid grid-cols-4 gap-4 pb-24 pt-2 pr-2 pl-2 md:pt-0 md:pr-0 md:pl-0 min-h-full">
			<div className="col-span-4  shadow-lg stats">
				<MarketStat />
			</div>

			<TaskList />

			<CalendarEvent />
		</div>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchtoProps = (dispatch) => ({
	loadTask: () => dispatch(loadTask()),
	loadEvent: () => dispatch(loadEvent()),
});

export default connect(mapStateToProps, mapDispatchtoProps)(Content);
