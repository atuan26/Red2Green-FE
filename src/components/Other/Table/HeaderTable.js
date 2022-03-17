import React from "react";
import FilterTable from "./FilterTable";

const HeaderTable = ({ title, hasFilter }) => {
  return (
    <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
      <h2 className="text-2xl leading-tight">{title}</h2>
      {hasFilter && <FilterTable />}
    </div>
  );
};

export default HeaderTable;
