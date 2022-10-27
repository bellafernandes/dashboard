import React, {Component} from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';
import {Board} from './Board';
import tasksData from '../../data/tasksData';

import "./styles.css";

let _columnId = 0;
let _cardId = 0;

// const initialCards = Array.from({length: 9}).map(() => ({
//   id: ++_cardId,
//   title: `Card ${_cardId}`,
// }));

const initialCards = tasksData.map((task) => ({
    id: task.id,
    title: `Card ${task.title}`,
    description: task.description,
    due: task.due,
    status: task.status,
    img: task.img,
    files: task.files,
    teammate1: task.teammate1,
    teammate2: task.teammate2,
    teammate3: task.teammate3,

  }));

const initialColumns = ['TODO', 'Doing', 'Done'].map((title, i) => ({
  id: _columnId++,
  title,
  cardIds: initialCards.slice(i * 2, i * 2 + 2).map(card => card.id),
}));

class App extends Component {
  state = {
    cards: initialCards,
    columns: initialColumns,
  };

  addCard = (columnId, _title) => {
    const title = _title.trim();
    if (!title) return;

    const newCard = {id: ++_cardId, title};
    this.setState(state => ({
      cards: [...state.cards, newCard],
      columns: state.columns.map(
        column =>
          column.id === columnId
            ? {...column, cardIds: [...column.cardIds, newCard.id]}
            : column
      ),
    }));
  };

  moveCard = (cardId, destColumnId, index) => {
    this.setState(state => ({
      columns: state.columns.map(column => ({
        ...column,
        cardIds: _.flowRight(
          // 2) If this is the destination column, insert the cardId.
          ids =>
            column.id === destColumnId
              ? [...ids.slice(0, index), cardId, ...ids.slice(index)]
              : ids,
          // 1) Remove the cardId for all columns
          ids => ids.filter(id => id !== cardId)
        )(column.cardIds),
      })),
    }));
  };

  render() {
    return (
      <Board
        cards={this.state.cards}
        columns={this.state.columns}
        moveCard={this.moveCard}
        addCard={this.addCard}
      />
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
