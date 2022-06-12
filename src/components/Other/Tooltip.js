import React from "react";

const ToolTip = ({ children, content }) => {
  return (
    <div className="tooltip" data-tip={content}>
      {children}
    </div>
  );
};

export default ToolTip;
