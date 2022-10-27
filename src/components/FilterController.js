import React, { useState } from "react";
import Filter from "./Filter";
import List from "./List";

import { filterData } from "../data";
import FilterClearButton from "./FilterClearButton";

// create an array of key/value pairs to transform back into a useable object
const initialState = Object.fromEntries(
  Object.keys(filterData).map(key => {
    return [key, { selected: [], unselected: filterData[key] }];
  })
);

const FilterController = () => {
  const [filter, setFilter] = useState(initialState);

  const clearFilters = () => setFilter(initialState);

  const update = (filterType, newState) => {
    setFilter({
      ...filter,
      [filterType]: newState
    });
  };

  return (
    <>
      <div
        className="container"
        style={{ position: "relative", padding: "1em" }}
      >
        <h2>Filters</h2>
        {Object.keys(filter).some(key => filter[key].selected.length !== 0) && (
          <FilterClearButton click={clearFilters}>Clear All</FilterClearButton>
        )}
        {Object.keys(filterData).map(item => (
          <Filter
            data={filter[item]}
            filterType={item}
            update={update}
            key={item}
          />
        ))}
      </div>
      <div className="container" style={{ borderLeft: "1px solid black" }}>
        <h2>List</h2>
        <List filters={filter} />
      </div>
    </>
  );
};

export default FilterController;
