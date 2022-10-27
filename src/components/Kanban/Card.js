import React, { Fragment, useState } from "react";
import { DragSource, DropTarget } from "react-dnd";
import cn from "classnames";
import _ from "lodash";
import tasksData from "../../data/tasksData";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import { LinkIcon, CalendarIcon } from "@heroicons/react/solid";

export function Card(props) {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const customAnimation = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
  };

  const totalBacklogs = tasksData.filter(
    (obj) => obj.status === "To do"
  ).length;

  const totalInProgress = tasksData.filter(
    (obj) => obj.status === "in progress"
  ).length;

  const totalCompleted = tasksData.filter(
    (obj) => obj.status === "done"
  ).length;

  return _.flowRight(
    props.connectDragSource,
    props.connectDropTarget
  )(
    <div>
      {/* <div
      className={cn("Card", {
        "Card--dragging": props.isDragging,
        "Card--spacer": props.isSpacer,
      })}
    >
      <div className="Card__title">{props.title}</div>
    </div> */}

      <div
        className={cn("Card", {
          "Card--dragging": props.isDragging,
          "Card--spacer": props.isSpacer,
        })}
      >
        <Fragment>
          <Accordion
            open={open === props.id}
            animate={customAnimation}
            onClick={() => handleOpen(props.id)}
            className="my-4 border-0"
          >
            <AccordionHeader className="bg-zinc-300/50 dark:bg-zinc-800/60 rounded-xl py-0 px-4 text-[16px] font-[400] dark:font-light border-b-0 text-purple-600 dark:text-purple-500 shadow-lg ring-1 ring-black ring-opacity-5">
              <span className="w-full h-full text-left py-4">
                {props.title}
              </span>
            </AccordionHeader>
            <AccordionBody>
              <p className="text-left text-sm dark:text-sky-300">
                {props.customer}
              </p>
              <h1 className="text-left text-[16px]">{props.description}</h1>

              <div className="flex items-center text-left mt-2">
                <CalendarIcon className="w-4 h-4 text-sky-500 mr-1" />
                <p className="dark:text-gray-500 text-sm">{props.due}</p>
              </div>

              <div class="flex justify-center items-center w-full mt-4">
                <img src={props.img} className="rounded-lg" alt="task img" />
              </div>

              <div className="flex justify-between items-center w-full mt-4">
                <div class="flex -space-x-4 items-center">
                  <img
                    class="w-8 h-8 rounded-full border-2 border-white"
                    src={props.teammate1}
                    alt="teammate img"
                  />
                  <img
                    class="w-8 h-8 rounded-full border-2 border-white"
                    src={props.teammate2}
                    alt=""
                  />
                  <img
                    class="w-8 h-8 rounded-full border-2 border-white"
                    src={props.teammate3}
                    alt=""
                  />
                </div>

                {tasksData.files > 0 ? (
                  <div className="flex items-center">
                    <LinkIcon className="w-4 h-4 text-sky-500 mr-1" />
                    {props.files}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </AccordionBody>
          </Accordion>
        </Fragment>
      </div>
    </div>
  );
}

export const DraggableCard = _.flowRight([
  DropTarget(
    "Card",
    {
      hover(props, monitor) {
        const { columnId, columnIndex } = props;
        const draggingItem = monitor.getItem();
        if (draggingItem.id !== props.id) {
          props.moveCard(draggingItem.id, columnId, columnIndex);
        }
      },
    },
    (connect) => ({
      connectDropTarget: connect.dropTarget(),
    })
  ),
  DragSource(
    "Card",
    {
      beginDrag(props) {
        return { id: props.id };
      },

      isDragging(props, monitor) {
        return props.id === monitor.getItem().id;
      },
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    })
  ),
])(Card);
