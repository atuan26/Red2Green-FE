import React, { useState } from "react"
import { FloatingLabelInput } from "../../Other/Form"

import { GrPowerReset } from "react-icons/gr"
import { MdOutlineManageSearch } from "react-icons/md"
import ReactDatePicker from "react-datepicker"

const Filter = () => {
    const [dateRange, setDateRange] = useState([new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()]);
    const [startDate, endDate] = dateRange;

    return <div className="w-full  shadow p-5 rounded-lg bg-white mb-4">

        <div className="flex items-center justify-between ">
            <p className="font-medium">
                Signal Filter
            </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
            <FloatingLabelInput name="signals__channel__name__icontains" label="Signal Channel" />
            <FloatingLabelInput label="Signal Content" name="signals__content__icontains" />
            <FloatingLabelInput
                label="Content Category"
                name=""
            />
            <FloatingLabelInput
                label="Symbol"
                name="symbol__base__symbol__iexact"
            />
            <FloatingLabelInput
                label="Exchange"
                name="exchange__name__icontains"
            />
            <div>
                <ReactDatePicker
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => {
                        setDateRange(update);
                    }}
                    isClearable={true}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholderText="Post Date"
                />
            </div>
            <div className="-mt-4 col-span-2 md:col-span-3 xl:col-span-4 flex items-center justify-center gap-4 ">
                <button className="px-4 py-2 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center ">
                    <MdOutlineManageSearch className="w-5 h-5 inline mr-2" />
                    Search
                </button>

                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md">
                    <GrPowerReset className="w-4 h-4 inline mr-2" />
                    Reset Filter
                </button>
            </div>

        </div>
    </div>
}

export default Filter