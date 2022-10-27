import React from "react";
import { messages as cardData } from "../data";
import Card from "./Card";

const List = ({ filters }) => {
  const categories = Object.keys(filters);

  // filter only that cards that meet all the selected filters
  const cards = cardData.filter((card, i) => {
    // test each card with all the criteria
    // !categories.some is because .some returns as soon as it's truthy
    // so the card has to pass all the tests with FALSE instead of TRUE
    // That way as soon as it's truthy it exits the and excludes the card
    const includeCard = !categories.some(category => {
      // if there is not a filter applied stop checking this category
      if (filters[category].selected.length === 0) {
        return false;
        // if there is a filter and it's an array, not a string
      } else if (typeof card[category] === "string") {
        // return whether the filter includes the card data
        return filters[category].selected.includes(card[category])
          ? false
          : true;
      }
      // if there is a filter and it's not a string (it's an array)
      // return whether the
      return !filters[category].selected.some(item =>
        card[category].includes(item)
      );
    });

    return includeCard;
  });

  return (
    <div>
      {cards.length === 0 ? (
        <p>Sorry, no messages match your filter parameters</p>
      ) : (
        cards.map(card => <Card data={card} key={card.id} />)
      )}
    </div>
  );
};

export default List;