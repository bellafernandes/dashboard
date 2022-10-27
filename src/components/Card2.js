import React from "react";

export default ({ data }) => {
  return (
    <div className="card">
      <h5>{data.title}</h5>
      <h6>{data.year}</h6>
      <h6>{data.communicator}</h6>
      <h6>
        {data.tags
          .sort()
          .toString()
          .replace(/,/g, ", ")}
      </h6>
    </div>
  );
};
