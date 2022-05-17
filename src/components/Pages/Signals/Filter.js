import React, { memo, useState } from "react"
import { FloatingLabelInput } from "../../Other/Form"

import { IoIosRefresh } from "react-icons/io"
import { MdOutlineManageSearch } from "react-icons/md"
import ReactDatePicker from "react-datepicker"
import { connect } from "react-redux"
import { resetQuery, setQuery } from "../../../redux/actions/signalAction"

const Filter = ({ onSubmitFilter, filterQuery, setQuery, resetQuery }) => {
    console.log('Filter re render');
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const handleChange = (e) => {
        setQuery({ [e.target.name]: e.target.value })
    }
    return <form
        onSubmit={onSubmitFilter}
        className="w-full  shadow p-5 rounded-lg bg-white mb-4"
    >

        <div className="flex items-center justify-between ">
            <p className="font-medium">
                Signal Filter
            </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
            <FloatingLabelInput
                name="signals__channel__name__icontains"
                label="Signal Channel"
                value={filterQuery?.signals__channel__name__icontains || ""}
                onChange={handleChange}
            />
            <FloatingLabelInput
                label="Signal Content"
                name="signals__content__icontains"
                value={filterQuery?.signals__content__icontains || ""}
                onChange={handleChange}

            />
            {/* <FloatingLabelInput
                label="Content Category"
                name=""
                // value={filterQuery?. "]  ""}
                onChange={handleChange}
            /> */}
            <FloatingLabelInput
                label="Symbol"
                name="symbol__base__symbol__iexact"
                value={filterQuery?.symbol__base__symbol__iexact || ""}
                onChange={handleChange}

            />
            <FloatingLabelInput
                label="Exchange"
                name="exchange__name__icontains"
                value={filterQuery?.exchange__name__icontains || ""}
                onChange={handleChange}

            />
            <div>
                <ReactDatePicker
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => {
                        setDateRange(update)
                        setQuery({ signals__post_date__gte: update[0]?.toISOString() || "" })
                        setQuery({ signals__post_date__lte: update[1]?.toISOString() || "" })
                    }}
                    isClearable={true}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholderText="Post Date"
                />
            </div>
            <div className="-mt-4 col-span-2 md:col-span-3 xl:col-span-4 flex items-center justify-center gap-4 ">
                <div
                    onClick={resetQuery}
                    className="flex items-center gap-2 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                >
                    <IoIosRefresh className="w-5 h-5" />
                    Reset filter
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center  gap-2 ">
                    <MdOutlineManageSearch className="w-6 h-6" />
                    Search
                </button>
            </div>

        </div>
    </form>
}

const mapStateToProps = (state) => ({
    filterQuery: state.signal.filterQuery,
    // query: state.signal.query
});

const mapDispatchtoProps = (dispatch) => ({
    setQuery: (filterQuery) => dispatch(setQuery(filterQuery)),
    resetQuery: () => dispatch(resetQuery()),
});

export default connect(mapStateToProps, mapDispatchtoProps)(memo(Filter));