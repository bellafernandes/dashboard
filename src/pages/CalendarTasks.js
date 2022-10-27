import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import { React, useState, useEffect } from "react";
import { useSpring, animated, config } from "react-spring";

import CalendarDemo from "../components/CalendarDemo";
import Sidebar from "../components/Sidebar";

import "./styles.css";

export default function CalendarTasks() {
  const [showSidebar, onSetShowSidebar] = useState(false);
  return (
    <div className="flex">
      <Sidebar
        onSidebarHide={() => {
          onSetShowSidebar(false);
        }}
        showSidebar={showSidebar}
      />
      <Content
        onSidebarHide={() => {
          onSetShowSidebar(true);
        }}
      />
    </div>
  );
}

function Content({ onSidebarHide }) {


  const [date, setDate] = useState(new Date());

  const { dashOffset, indicatorWidth, indicatorWidth2, indicatorWidth3, percentage, percentage2, percentage3 } = useSpring({
    dashOffset: 26.015,
    indicatorWidth: 45,
    indicatorWidth2: 90,
    indicatorWidth3: 75,
    percentage: 45,
    percentage2: 95,
    percentage3: 75,
    from: { dashOffset: 113.113, indicatorWidth: 0, indicatorWidth2: 0, indicatorWidth3: 0, percentage: 0, percentage2: 0, percentage3: 0 },
    config: config.molasses,
  });


  return (
    <div className="flex w-full bg-zinc-300/90 dark:bg-zinc-900/95">
        <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
          .
        </div>
        <div className="h-auto flex-grow overflow-hidden overflow-auto flex flex-wrap content-start p-2">
          <div className="w-full sm:flex p-2 items-end">
            <div className="sm:flex-grow flex justify-between">
              <div className="-mt-8 sm:-mt-16 absolute">
                <div className="flex items-center">
                  <div className="text-md sm:text-lg md:text-2xl text-zinc-900/90 dark:text-gray-200">
                    Schedules
                  </div>
                </div>
                <div className="flex items-center">
                  <Icon
                    path="res-react-dash-date-indicator"
                    className="w-3 h-3"
                  />
                  <div className="ml-2">
                    <p className="text-xs sm:text-sm md:text-base text-center text-zinc-700/90 dark:text-gray-400">
                      {date.toDateString()}
                    </p>
                  </div>
                </div>
              </div>
              <IconButton
                icon="res-react-dash-sidebar-open"
                className="block sm:hidden absolute -mt-16 dark:text-gray-200"
                onClick={onSidebarHide}
              />
            </div>
          </div>

        <div className="w-full pt-2 px-10 overflow-y-auto">
          {/* <div className="w-full h-auto flex flex-row mt-10 mb-10 justify-between">
            <div className="w-2/6 h-auto p-4 bg-zinc-900/95 rounded-lg mr-6">
              <div className="flex flex-row justify-between text-gray-300">
                <h1>UI/UX Design</h1>
                <Icon
                  path="res-react-dash-options"
                  className="block sm:hidden xl:block w-3 h-3 mt-1"
                />
              </div>
              <div className="text-gray-500 text-sm">Adobe XD</div>
              <div class="flex mb-5 mt-3 -space-x-4">
                <img
                  class="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800"
                  src="../../assets/profile-picture-4.jpg"
                  alt=""
                />
                <img
                  class="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800"
                  src="../../assets/profile-picture-3.jpg"
                  alt=""
                />
                <img
                  class="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800"
                  src="../../assets/profile-picture-5.jpg"
                  alt=""
                />
                <img
                  class="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800"
                  src="../../assets/profile-picture-2.jpg"
                  alt=""
                />
              </div>

              <h1 className="text-gray-300">Progresso</h1>
              <svg
                viewBox="0 0 95 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="-ml-5"
              >
                <line
                  x1="5"
                  y1="5.25"
                  x2="95"
                  y2="5.25"
                  stroke="#535353"
                  strokeWidth="5"
                  // strokeLinecap="round"
                />
                <animated.line
                  x1="5"
                  y1="5.25"
                  x2={indicatorWidth}
                  y2="5.25"
                  stroke="rgb(99 102 241)"
                  strokeWidth="5"
                  // strokeLinecap="round"
                />
              </svg>
              <animated.div className="flex justify-end text-indigo-500">
                {percentage.interpolate((i) => `${Math.round(i)}%`)}
                </animated.div>
            </div>
            <div className="w-2/6 h-auto p-4 bg-zinc-900/95 rounded-lg mr-6">
              <div className="flex flex-row justify-between text-gray-300">
                <h1>Mobile App</h1>
                <Icon
                  path="res-react-dash-options"
                  className="block sm:hidden xl:block w-3 h-3 mt-1"
                />
              </div>
              <div className="text-gray-500 text-sm">React Native</div>
              <div class="flex mb-5 mt-3 -space-x-4">
                <img
                  class="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800"
                  src="../../assets/profile-picture-4.jpg"
                  alt=""
                />
                <img
                  class="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800"
                  src="../../assets/profile-picture-3.jpg"
                  alt=""
                />
                <img
                  class="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800"
                  src="../../assets/profile-picture-5.jpg"
                  alt=""
                />
                <img
                  class="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800"
                  src="../../assets/profile-picture-2.jpg"
                  alt=""
                />
              </div>

              <h1 className="text-gray-300">Progresso</h1>
              <svg
                viewBox="0 0 95 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="-ml-5"
              >
                <line
                  x1="5"
                  y1="5.25"
                  x2="95"
                  y2="5.25"
                  stroke="#535353"
                  strokeWidth="5"
                  // strokeLinecap="round"
                />
                <animated.line
                  x1="5"
                  y1="5.25"
                  x2={indicatorWidth2}
                  y2="5.25"
                  stroke="rgb(249 115 22)"
                  strokeWidth="5"
                  // strokeLinecap="round"
                />
              </svg>
              <animated.div className="flex justify-end text-orange-500">
                {percentage2.interpolate((i) => `${Math.round(i)}%`)}
                </animated.div>
            </div>

            <div className="w-2/6 h-auto p-4 bg-zinc-900/95 rounded-lg">
              <div className="flex flex-row justify-between text-gray-300">
                <h1>Identidade Visual</h1>
                <Icon
                  path="res-react-dash-options"
                  className="block sm:hidden xl:block w-3 h-3 mt-1"
                />
              </div>
              <div className="text-gray-500 text-sm">Photoshop</div>
              <div class="flex mb-5 mt-3 -space-x-4">
                <img
                  class="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800"
                  src="../../assets/profile-picture-4.jpg"
                  alt=""
                />
                <img
                  class="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800"
                  src="../../assets/profile-picture-3.jpg"
                  alt=""
                />
                <img
                  class="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800"
                  src="../../assets/profile-picture-5.jpg"
                  alt=""
                />
                <img
                  class="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800"
                  src="../../assets/profile-picture-2.jpg"
                  alt=""
                />
              </div>

              <h1 className="text-gray-300">Progresso</h1>
              <svg
                viewBox="0 0 95 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="-ml-5"
              >
                <line
                  x1="5"
                  y1="5.25"
                  x2="95"
                  y2="5.25"
                  stroke="#535353"
                  strokeWidth="5"
                  // strokeLinecap="round"
                />
                <animated.line
                  x1="5"
                  y1="5.25"
                  x2={indicatorWidth3}
                  y2="5.25"
                  stroke="rgb(14 165 233)"
                  strokeWidth="5"
                  // strokeLinecap="round"
                />
              </svg>
              <animated.div className="flex justify-end text-sky-400">
                {percentage3.interpolate((i) => `${Math.round(i)}%`)}
                </animated.div>
            </div>

          
          </div> */}

          <div className="rounded-lg bg-card sm:h-80 h-60 ">
            <CalendarDemo />
          </div>
        </div>
      </div>
    </div>
  );
}

function Icon({ path = "options", className = "w-4 h-4" }) {
  return (
    <img
      src={`https://assets.codepen.io/3685267/${path}.svg`}
      alt=""
      className={clsx(className)}
    />
  );
}

function IconButton({
  onClick = () => {},
  icon = "options",
  className = "w-4 h-4",
}) {
  return (
    <button onClick={onClick} type="button" className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 9h16.5m-16.5 6.75h16.5"
        />
      </svg>
    </button>
  );
}
