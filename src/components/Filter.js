import React from "react";
import FilterClearButton from "./FilterClearButton";
import FilterChip from "./FilterChip";

// helper functions to add or remove from an array - don't need
// instantiated on every render

const addTodata = (arr, item) => arr.concat([item]).sort();
const removeFromdata = (arr, item) =>
  arr.filter(el => {
    return el !== item;
  });

const Filter = ({ data, filterType, update }) => {
  const noFilters = data.selected.length === 0;

  // create a new array with key/value pairs based on whether the item is selected or not
  const dataArr = noFilters
    ? // if there are no filters just create a new array with every key/falue pair set to false
      data.unselected.map(i => [i, false])
    : data.selected
        // create a new array for all the selected items
        .map(i => [i, true])
        // concat with new array for all the unselected items
        .concat(data.unselected.map(i => [i, false]))
        // sort the concatted array to alphabetize
        .sort();

  return (
    <div className="filter-container">
      <h3>{filterType}</h3>
      {!noFilters && (
        <FilterClearButton
          click={() =>
            update(filterType, {
              selected: [],
              unselected: data.unselected.concat(data.selected).sort()
            })
          }
        >
          Clear
        </FilterClearButton>
      )}
      <div>
        {dataArr.map(item => {
          return (
            <FilterChip
              className={`filter-chip ${item[1] ? "active" : ""}`}
              active={item[1]}
              click={() => {
                update(filterType, {
                  selected: item[1]
                    ? removeFromdata(data.selected, item[0])
                    : addTodata(data.selected, item[0]),
                  unselected: item[1]
                    ? addTodata(data.unselected, item[0])
                    : removeFromdata(data.unselected, item[0])
                });
              }}
              key={item[0].replace(/ /g, "")}
            >
              {item[0]}
            </FilterChip>
          );
        })}
      </div>
    </div>
  );
};

export default Filter;