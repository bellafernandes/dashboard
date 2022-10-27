import React from 'react';
import {TextForm} from './TextForm';

export function Column(props) {
  return (
    <div className="Column w-full lg:w-1/3 px-6">
      <div className="Column__title">{props.title}</div>
      {props.children}
      {/* <TextForm onSubmit={props.addCard} placeholder="Add card..." /> */}
    </div>
  );
}
