import React from "react";

const DataTable = ({ data }) => {
  return data ? (
    <>
      <table className="min-w-full leading-normal rounded-lg ">
        <thead>
          <tr>
            {console.log(data[0])}
            {Object.keys(data[0]).map((key, index) => (
              <THtable key={index} title={key.replace("_", " ")} />
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((dataRow, indexRow) => (
            <tr key={indexRow}>
              {Object.keys(dataRow).map((dataCell, indexCell) => (
                <TDtable key={indexCell} content={dataRow[dataCell]} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  ) : (
    <h3>No data</h3>
  );
};

const THtable = ({ title }) => {
  return (
    <th
      scope="col"
      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-medium"
    >
      {title}
    </th>
  );
};
const TDtable = ({ content }) => {
  return (
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <p className="text-gray-900 whitespace-no-wrap">{content}</p>
    </td>
  );
};

export default DataTable;
