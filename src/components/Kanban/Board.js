import React from "react";
import { Column } from "./Column";
import { DraggableCard } from "./Card";

export function Board({ cards, columns, moveCard, addCard }) {
  return (
    <div className="Board flex flex-wrap flex-col-3 justify-between dark:text-gray-300 mt-4 mb-20">
      {columns.map((column) => (
        <Column
          key={column.id}
          title={column.title}
          addCard={addCard.bind(null, column.id)}
        >
          {column.cardIds
            .map((cardId) => cards.find((card) => card.id === cardId))
            .map((card, index) => (
              <DraggableCard
                key={card.id}
                id={card.id}
                columnId={column.id}
                columnIndex={index}
                title={card.title}
                description={card.description}
                due={card.due}
                status={card.status}
                files={card.files}
                teammate1={card.teammate1}
                teammate2={card.teammate2}
                teammate3={card.teammate3}
                img={card.img}
                moveCard={moveCard}
              />
            ))}
          {column.cardIds.length === 0 && (
            <DraggableCard
              isSpacer
              moveCard={(cardId) => moveCard(cardId, column.id, 0)}
            />
          )}
        </Column>
      ))}
    </div>
  );
}
