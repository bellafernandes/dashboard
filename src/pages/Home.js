import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import React, { useState, useCallback, useEffect } from "react";
import { useSpring, animated, config } from "react-spring";
import Calendar from "react-calendar";
import Sidebar from "../components/Sidebar";
import { CircularProgressbar } from "react-circular-progressbar";
import ProgressProvider from "../components/ProgressProvider";
import "flowbite";
import "./styles.css";

import importantTasksData from "../data/importantTasksData";

// Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";

import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LinkIcon,
  CalendarIcon,
} from "@heroicons/react/solid";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const graphData = ["Mon", "Tue", "Wed", "Thu", "Fri"].map((i) => {
  const revenue = 500 + Math.random() * 2000;
  const expectedRevenue = Math.max(revenue + (Math.random() - 0.5) * 2000, 0);
  return {
    name: i,
    revenue,
    expectedRevenue,
    sales: Math.floor(Math.random() * 500),
  };
});


export default function Home() {
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
  const [date] = useState(new Date());

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Skeleton />;
  } else {
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
                    Dashboard
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

          <div className="w-full p-2 lg:w-3/5">
            <div className="rounded-lg bg-card transition duration-200 h-96 bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-zinc-900">
              <Graph />
            </div>
          </div>
          <div className="w-full p-2 lg:w-2/5 2xl:w-1/5">
            <div className="rounded-lg bg-card h-96 transition duration-200 bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-zinc-900">
              <Activities />
            </div>
          </div>
          <div className="w-full p-2 lg:hidden 2xl:inline 2xl:w-1/5">
            <div className="rounded-lg bg-card h-96 transition duration-200 bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-zinc-900">
              <Segmentation />
            </div>
          </div>
          <div className="w-full p-2 lg:w-1/2">
            <div className="rounded-lg bg-card h-96 transition duration-200 bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-zinc-900">
              <Team />
            </div>
          </div>
          <div className="w-full p-2 lg:w-1/2">
            <div className="rounded-lg bg-card h-auto transition duration-200 bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-zinc-900">
              <ImportantTasks />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function Graph() {
  const CustomTooltip = () => (
    <div className="rounded-xl overflow-hidden tooltip-head">
      <div className="flex items-center justify-between p-2">
        <div className="text-zinc-900/90 dark:text-gray-300">Revenue</div>
        <Icon path="res-react-dash-options" className="w-2 h-2" />
      </div>
      <div className="tooltip-body text-center p-3">
        <div className="text-white font-bold">$1300.50</div>
        <div className="text-zinc-300">Revenue of 230 sells</div>
      </div>
    </div>
  );
  return (
    <div className="flex p-4 h-full flex-col">
      <div className="">
        <div className="flex items-center">
          <div className="text-white flex items-center">
            <span className="text-zinc-900/90 dark:text-gray-300 font-medium">
              Revenue ($)
            </span>
            <Icon path={"res-react-dash-bull"} className="w-6 h-6 ml-4 mr-2" />
          </div>
          <span className="text-green-400">+0,3%</span>
          <div className="flex-grow" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 100 100"
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                {/* <stop offset="0%" stop-color="#28c1d6" />
                <stop offset="100%" stop-color="#1edd94" /> */}
                <stop offset="0%" stop-color="#6B8DE3" />
                <stop offset="100%" stop-color="#7D1C8D" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="url(#gradient)"
              stroke-width="10"
              fill="none"
              transform="rotate(90 50 50)"
            />
          </svg>
          <div className="ml-1 mr-4 dark:text-gray-300">This week</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 100 100"
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#00bc9b" />
                <stop offset="100%" stop-color="#5eaefd" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#525252"
              stroke-width="10"
              fill="none"
              transform="rotate(90 50 50)"
            />
          </svg>
          <div className="ml-1 dark:text-gray-300">Last week</div>
        </div>
        {/* <div className="font-bold ml-5">Nov - Jul</div> */}
      </div>

      <div className="flex-grow mt-10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={300} data={graphData}>
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#6B8DE3" />
                <stop offset="1" stopColor="#dc5ce0" />
              </linearGradient>
            </defs>
            <CartesianGrid
              horizontal={false}
              strokeWidth="6"
              stroke="#525252"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
            />
            <YAxis axisLine={false} tickLine={false} tickMargin={10} />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Line
              activeDot={false}
              type="monotone"
              dataKey="expectedRevenue"
              stroke="#525252"
              strokeWidth="3"
              dot={false}
              strokeDasharray="8 8"
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="url(#paint0_linear)"
              strokeWidth="4"
              dot={false}
              strokeLinecap="round"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ImportantTasks() {
  return (
    <div className="flex p-4 flex-col h-full">
      <div className="w-full h-full">
          <div className="flex justify-between w-full">
            <div>
              <h1 className="text-zinc-900/90 dark:text-gray-300 font-medium">
                Important tasks
              </h1>
            </div>
            <div className="flex text-zinc-500/90 dark:text-gray-500">
              <ChevronLeftIcon className="button-prev w-6 h-6 hover:text-zinc-900/90 hover:dark:text-gray-300" />
              <ChevronRightIcon className="button-next w-6 h-6 hover:text-zinc-900/90 hover:dark:text-gray-300" />
            </div>
          </div>
          <div className="mt-6">
            <Swiper
              pagination={{
                type: "progressbar",
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                912: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                },
                1240: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                1342: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                1520: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                1680: {
                  slidesPerView: 2.5,
                  spaceBetween: 10,
                },
              }}
              navigation={{
                nextEl: ".button-next",
                prevEl: ".button-prev",
              }}
              modules={[Pagination, Navigation]}
              className="mySwiper w-full h-max"
            >
              {importantTasksData.map((el) => (
                <SwiperSlide className="mr-6 cursor-grab">
                  <div className="bg-purple-500 w-full p-4">
                    <div className="flex flex-col-2 justify-between">
                      <div>
                        <h1 className="text-gray-300 text-sm mb-4">Members:</h1>
                        <div class="flex mb-5 -space-x-4">
                          <img
                            class="w-10 h-10 rounded-full border-2 border-white"
                            src={el.imgTeam1}
                            alt=""
                          />
                          <img
                            class="w-10 h-10 rounded-full border-2 border-white"
                            src={el.imgTeam2}
                            alt=""
                          />
                          <img
                            class="w-10 h-10 rounded-full border-2 border-white"
                            src={el.imgTeam3}
                            alt=""
                          />
                          <img
                            class="w-10 h-10 rounded-full border-2 border-white"
                            src={el.imgTeam4}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h1 className="text-gray-300 text-sm mb-4">Due:</h1>
                        <p className="text-gray-300 text-base">{el.deadline}</p>
                        <p></p>
                      </div>
                    </div>

                    <hr className="mb-4" />

                    <div>
                      <h1 className="text-gray-200 font-medium">{el.title}</h1>
                      <ul className="text-gray-300 text-sm">
                        <li className="mt-2 mb-4">
                          <input
                            type="checkbox"
                            id="cbox"
                            value="task_checkbox"
                            className="ring-0 border-0 focus:ring-0 mr-2 transition ease-in-out delay-50 rounded-full"
                          />
                          <label for="cbox">{el.task1}</label>
                        </li>
                        <li className="mb-4">
                          <input
                            type="checkbox"
                            id="cbox"
                            value="task_checkbox"
                            className="ring-0 border-0 focus:ring-0 mr-2 transition ease-in-out delay-50 rounded-full"
                          />
                          <label for="cbox">{el.task2}</label>
                        </li>
                        <li className="mb-4">
                          <input
                            type="checkbox"
                            id="cbox"
                            value="task_checkbox"
                            className="ring-0 border-0 focus:ring-0 mr-2 transition ease-in-out delay-50 rounded-full"
                          />
                          <label for="cbox">{el.task3}</label>
                        </li>
                      </ul>
                    </div>
                    <div className="w-full h-auto">
                      <a href="/Tasks">
                      <button className="flex justify-between text-sm text-gray-300 w-full items-center mt-6 bg-purple-400/50 hover:bg-purple-600/50 transition ease-in-out delay-50 p-4">
                        <div>See details</div>
                        <ArrowRightIcon className="w-4 h-4" />
                      </button>
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
    </div>
  );
}

function Activities() {
  
  return (
    <div className="flex p-4 flex-col h-full text-zinc-900/90 dark:text-gray-300">
      <div
        className="flex sm:justify-start md:justify-center lg:justify-start content-start items-center mt-4"
        style={{ fill: "#484091" }}
      >
        <ProgressProvider valueStart={0} valueEnd={21}>
          {(value) => (
            <CircularProgressbar
              value={value}
              text={`${value}%`}
              className="circular-progressbar w-24 h-24 fill-purple"
              strokeWidth="6"
            />
          )}
        </ProgressProvider>
        <span className="flex flex-wrap align-middle ml-4">
          Completed tasks
        </span>
      </div>

      <div
        className="flex sm:justify-start md:justify-center lg:justify-start content-start items-center mt-4"
        style={{ fill: "#dc5ce0" }}
      >
        <ProgressProvider valueStart={0} valueEnd={67}>
          {(value) => (
            <CircularProgressbar
              value={value}
              text={`${value}%`}
              className="circular-progressbar w-24 h-24 fill-pink"
              strokeWidth="6"
            />
          )}
        </ProgressProvider>
        <span className="flex flex-wrap align-middle ml-4">Goals achieved</span>
      </div>

      <div
        className="flex sm:justify-start md:justify-center lg:justify-start content-start items-center mt-4"
        style={{ fill: "#3e98c7" }}
      >
        <ProgressProvider valueStart={0} valueEnd={80}>
          {(value) => (
            <CircularProgressbar
              value={value}
              text={`${value}%`}
              className="circular-progressbar w-24 h-24 fill-blue"
              strokeWidth="6"
            />
          )}
        </ProgressProvider>
        <span className="flex flex-wrap align-middle ml-4">
          Satisfied customers
        </span>
      </div>

      {/* <div className="flex-grow" />
       <div className="flex justify-center">
        <div className="">Ver tudo</div>
      </div> */}
    </div>
  );
}

function Segmentation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <div className="flex p-4 flex-col h-full">
      <div className="flex justify-between items-center">
        <div className="text-zinc-900/90 dark:text-gray-300 font-medium mb-4">
          Calendar
        </div>
      </div>

      <Calendar className="mx-auto dark:text-gray-300" />

      <div className="flex-grow" />
      <div className="flex justify-center">
        {/* <div className="dark:text-gray-300 sidebar-item">
          <a href="/CalendarTasks">Ver tudo</a>
        </div> */}
      </div>
    </div>
  );
}

function Team() {
  const {
    indicatorWidth,
    indicatorWidth2,
    indicatorWidth3,
    indicatorWidth4,
    percentage,
    percentage2,
    percentage3,
    percentage4,
  } = useSpring({
    dashOffset: 26.015,
    indicatorWidth: 96,
    indicatorWidth2: 38,
    indicatorWidth3: 64,
    indicatorWidth4: 7,
    percentage: 100,
    percentage2: 38,
    percentage3: 64,
    percentage4: 7,
    from: {
      dashOffset: 113.113,
      indicatorWidth: 0,
      indicatorWidth2: 0,
      indicatorWidth3: 0,
      indicatorWidth4: 0,
      percentage: 0,
      percentage2: 0,
      percentage3: 0,
      percentage4: 0,
    },
    config: config.molasses,
  });

  return (
    <div className="flex p-4 flex-col h-full">
      <div className="flex justify-between items-center">
        <div className="text-zinc-900/90 dark:text-gray-300 font-medium mb-4">
          Team B
        </div>
      </div>

      <div class="overflow-hidden relative">
        <table class="w-full text-sm text-center text-zinc-900/90 dark:text-gray-300">
          <thead class="border-b text-xs uppercase bg-transparent">
            <tr>
              <th scope="col" className="py-3 px-6">
                <span className="font-medium">Name</span>
              </th>
              <th scope="col" className="py-3 px-6">
                <span className="font-medium">Progress</span>
              </th>
              <th scope="col" className="py-3 px-6">
                <span className="font-medium">Tasks</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-transparent">
              <th scope="row" class="py-4 px-6 whitespace-nowrap">
                <span className="font-medium text-zinc-900/90 dark:text-gray-300">
                  Jim Morrison
                </span>
              </th>
              <td class="px-6">
                <div className="w-full text-gray-300 mt-6">
                  <svg
                    viewBox="0 0 100 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="5"
                      y1="5.25"
                      x2="95"
                      y2="5.25"
                      stroke="#3C3C3C"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                    />
                    <animated.line
                      x1="5"
                      y1="5.25"
                      x2={indicatorWidth}
                      y2="5.25"
                      stroke="#22af45"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <animated.div className="flex justify-end green-txt">
                  {percentage.interpolate((i) => `${Math.round(i)}%`)}
                </animated.div>
              </td>
              <td class="py-4 px-6">
                <span className="font-medium text-zinc-900/90 dark:text-gray-300">
                  109
                </span>
              </td>
            </tr>
            <tr class="bg-transparent">
              <th scope="row" class="py-4 px-6 whitespace-nowrap">
                <span className="font-medium text-zinc-900/90 dark:text-gray-300">
                  Lucy Roberts
                </span>
              </th>
              <td class="px-6">
                <div className="w-full mt-6">
                  <svg
                    viewBox="0 0 100 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="5"
                      y1="5.25"
                      x2="95"
                      y2="5.25"
                      stroke="#3C3C3C"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                    />
                    <animated.line
                      x1="5"
                      y1="5.25"
                      x2={indicatorWidth2}
                      y2="5.25"
                      stroke="#484091"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <animated.div className="purple-txt flex justify-end">
                  {percentage2.interpolate((i) => `${Math.round(i)}%`)}
                </animated.div>
              </td>
              <td class="py-4 px-6">
                <span className="font-medium text-zinc-900/90 dark:text-gray-300">
                  31
                </span>
              </td>
            </tr>
            <tr class="bg-transparent">
              <th scope="row" class="py-4 px-6 whitespace-nowrap">
                <span className="font-medium text-zinc-900/90 dark:text-gray-300">
                  Alison Parker
                </span>
              </th>
              <td class="px-6">
                <div className="w-full text-gray-300 mt-6">
                  <svg
                    viewBox="0 0 100 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="5"
                      y1="5.25"
                      x2="95"
                      y2="5.25"
                      stroke="#3C3C3C"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                    />
                    <animated.line
                      x1="5"
                      y1="5.25"
                      x2={indicatorWidth3}
                      y2="5.25"
                      stroke="#dc5ce0"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <animated.div className="flex justify-end pink-txt">
                  {percentage3.interpolate((i) => `${Math.round(i)}%`)}
                </animated.div>
              </td>
              <td class="py-4 px-6">
                <span className="font-medium text-zinc-900/90 dark:text-gray-300">
                  74
                </span>
              </td>
            </tr>
            <tr class="bg-transparent">
              <th scope="row" class="py-4 px-6 whitespace-nowrap">
                <span className="font-medium text-zinc-900/90 dark:text-gray-300">
                  Mike Wong
                </span>
              </th>
              <td class="px-6">
                <div className="w-full mt-6">
                  <svg
                    viewBox="0 0 100 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="5"
                      y1="5.25"
                      x2="95"
                      y2="5.25"
                      stroke="#3C3C3C"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                    />
                    <animated.line
                      x1="5"
                      y1="5.25"
                      x2={indicatorWidth4}
                      y2="5.25"
                      stroke="#979797"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <animated.div className="flex grey-txt justify-end green-txt">
                  {percentage4.interpolate((i) => `${Math.round(i)}%`)}
                </animated.div>
              </td>
              <td class="py-4 px-6">
                <span className="font-medium text-zinc-900/90 dark:text-gray-300">
                  11
                </span>
              </td>
            </tr>
          </tbody>
        </table>
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

function Skeleton() {
  return (
    <div className="flex w-full bg-zinc-300/90 dark:bg-zinc-900/95">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className="h-auto flex-grow overflow-hidden overflow-auto flex flex-wrap content-start p-2">
        <div className="w-full sm:flex p-2 items-end">
          <div className="sm:flex-grow flex justify-between">
            <div className="-mt-8 sm:-mt-16 absolute">
              <div className="flex items-center mb-2">
                <div className="w-36 h-8 rounded-lg container" />
              </div>
              <div className="flex items-center">
                <div className="w-36 h-6 rounded-lg container" />
              </div>
            </div>
          </div>
        </div>

        {/* Graph */}
        <div className="w-full p-2 lg:w-3/5">
          <div className="rounded-lg bg-card transition duration-200 h-96 shadow-lg ring-1 ring-black ring-opacity-5 px-4 py-6">
            <div className="flex justify-between w-full">
              <div className="w-52 h-6 rounded-lg container" />
              <div className="w-48 h-6 rounded-lg container" />
            </div>

            <div className="w-full h-5/6 rounded-lg container mx-auto mt-6 py-4" />
          </div>
        </div>

        {/* Activities */}
        <div className="w-full p-2 lg:w-2/5 2xl:w-1/5">
          <div className="rounded-lg bg-card h-96 shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="flex p-4 flex-col h-full">
              {/* Activity 1 */}
              <div className="flex sm:justify-start md:justify-center lg:justify-start content-start items-center mt-4">
                <div className="container rounded-full w-24 h-24" />
                <div className="container rounded-lg w-2/4 h-6 align-middle ml-4" />
              </div>

              {/* Activity 2 */}
              <div className="flex sm:justify-start md:justify-center lg:justify-start content-start items-center mt-4">
                <div className="container rounded-full w-24 h-24" />
                <div className="container rounded-lg w-2/4 h-6 align-middle ml-4" />
              </div>

              {/* Activity 3 */}
              <div className="flex sm:justify-start md:justify-center lg:justify-start content-start items-center mt-4">
                <div className="container rounded-full w-24 h-24" />
                <div className="container rounded-lg w-2/4 h-6 align-middle ml-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Calendar */}

        <div className="w-full p-2 lg:hidden 2xl:inline 2xl:w-1/5">
          <div className="rounded-lg bg-card h-96 transition duration-200 shadow-lg ring-1 ring-black ring-opacity-5 py-6 px-4">
            <div className="w-28 h-6 rounded-lg container" />

            <div className="w-full h-5/6 rounded-lg container mx-auto mt-4" />
          </div>
        </div>

        {/* Customers */}
        <div className="w-full p-2 lg:w-1/3">
          <div className="rounded-lg bg-card h-96 transition duration-200 shadow-lg ring-1 ring-black ring-opacity-5 py-6 px-4">
            <div className="w-28 h-6 rounded-lg container" />
            <div className="w-full h-5/6 rounded-lg container mx-auto mt-4" />
          </div>
        </div>

        {/* Team */}
        <div className="w-full p-2 lg:w-1/3">
          <div className="rounded-lg bg-card h-96 transition duration-200 shadow-lg ring-1 ring-black ring-opacity-5 py-6 px-4">
            <div className="w-28 h-6 rounded-lg container" />
            <div className="w-full h-5/6 rounded-lg container mx-auto mt-4" />
          </div>
        </div>

        {/* Tips */}
        <div className="w-full p-2 lg:w-1/3">
          <div className="rounded-lg bg-card overflow-hidden h-96 transition duration-200 shadow-lg ring-1 ring-black ring-opacity-5 py-6 px-4">
            <div className="w-full h-10 rounded-lg container mx-auto" />

            {/* Tip 1 */}
            <div className="flex mt-6">
              <div className="w-14 h-14 mr-4 rounded-full container" />
              <div className="flex flex-col my-auto">
                <div className="w-28 h-4 rounded-lg container mb-2" />
                <div className="w-36 h-4 rounded-lg container" />
              </div>
            </div>

            {/* Tip 2 */}
            <div className="flex mt-6">
              <div className="w-14 h-14 mr-4 rounded-full container" />
              <div className="flex flex-col my-auto">
                <div className="w-28 h-4 rounded-lg container mb-2" />
                <div className="w-36 h-4 rounded-lg container" />
              </div>
            </div>

            {/* Tip 3 */}
            <div className="flex mt-6">
              <div className="w-14 h-14 mr-4 rounded-full container" />
              <div className="flex flex-col my-auto">
                <div className="w-28 h-4 rounded-lg container mb-2" />
                <div className="w-36 h-4 rounded-lg container" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
