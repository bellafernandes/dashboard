import React from "react";

const FilterClearButton = ({ children, click }) => {
  return (
    <button
      className="clear-button"
      onClick={() => click()}
    >{`${children}`}</button>
  );
};

export default FilterClearButton;
