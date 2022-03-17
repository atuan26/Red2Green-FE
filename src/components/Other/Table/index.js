import React from "react";
import DataTable from "./DataTable";
import HeaderTable from "./HeaderTable";
import Pagination from "./Pagination";

const Table = ({ title, hasFilter, data }) => {
  return (
    <div className="container w-full">
      <div className="py-8">
        <HeaderTable title={title} hasFilter={hasFilter} />
        <div className="overflow-x-auto no-scrollbar pt-4">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <DataTable data={data} />
          </div>
        </div>
        <Pagination />
      </div>
    </div>
  );
};

export default Table;
