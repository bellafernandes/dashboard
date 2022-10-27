import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import React, {
  useEffect,
  useState,
  Fragment,
  PureComponent,
} from "react";

import Kanban from "../components/Kanban";

import { useSpring, animated, config } from "react-spring";

import tasksData from "../data/tasksData";

import Sidebar from "../components/Sidebar";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import "flowbite";

import { ResponsiveContainer, PieChart, Pie, Sector } from "recharts";

import {
  LinkIcon,
  CalendarIcon,
} from "@heroicons/react/solid";

import "./styles.css";

const data = [
  { name: "Google", value: 400 },
  { name: "Direct", value: 300 },
  { name: "Links", value: 300 },
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      {/* <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text> */}
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {/* {`${(percent * 100).toFixed(2)}%`} */}
        {`${percent * 100}%`}
      </text>
    </g>
  );
};

export default function Tasks() {
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
                    Tasks management
                  </div>
                </div>
                <div className="flex items-center">
                  <Icon
                    path="res-react-dash-date-indicator"
                    className="w-3 h-3"
                  />
                  <div className="ml-2">
                    {date.length > 0 ? (
                      <p className="text-center">
                        <span className="bold">Start:</span>{" "}
                        {date[0].toDateString()}
                        &nbsp;|&nbsp;
                        <span className="bold">End:</span>{" "}
                        {date[1].toDateString()}
                      </p>
                    ) : (
                      <p className="text-xs sm:text-sm md:text-base text-center text-zinc-700/90 dark:text-gray-400">
                        {date.toDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <IconButton
                icon="res-react-dash-sidebar-open"
                className="block sm:hidden absolute -mt-16 dark:text-gray-200"
                onClick={onSidebarHide}
              />
            </div>
            <div className="w-full sm:w-56 mt-4 sm:mt-0 relative"></div>
          </div>
          <div className="w-full p-2 lg:w-full">
            <div className="rounded-lg bg-card transition duration-200 h-auto bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-zinc-900">
              <AllTasks />
            </div>
          </div>
          <div className="w-full p-2 lg:w-full">
            <div className="rounded-lg bg-card h-auto transition duration-200 bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-zinc-900">
              <Information />
            </div>
          </div>
          {/* <div className="w-full p-2 lg:w-1/5">
            <div className="rounded-lg bg-card overflow-hidden transition duration-200 bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-zinc-900">
              <RecentTL />
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export class Chart extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/s/pie-chart-with-customized-active-shape-y93si";

  state = {
    activeIndex: 0,
  };

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={this.onPieEnter}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

function Information() {
   const { indicatorWidth } = useSpring({
    dashOffset: 26.015,
    indicatorWidth: 96,
    percentage: 100,
    from: { dashOffset: 113.113, indicatorWidth: 0, percentage: 0 },
    config: config.molasses,
  });

  return (
    <div className="w-full h-full p-4">
      <div className="w-full h-full flex flex-col xl:flex-row">
        {/* COLUNA DA ESQUERDA */}
        <div className="w-full h-full xl:w-1/2 xl:h-full">
          <h1 className="text-zinc-900/90 dark:text-gray-300 text-lg">
            Projects summary
          </h1>
          <div className="w-full h-full flex flex-col md:flex-row md:mb-6 lg:mb-6 mb-0 xl:flex-row mt-10">
            <div className="w-full md:w-1/2 xl:w-1/3 xl:mx-auto 2xl:w-1/2">
              <Chart />
            </div>
            <div className="lg:w-1/2 xl:w-1/3 xl:mx-auto xl:px-0 2xl:w-1/2 h-full px-10 2xl:pr-20 pt-6 bg:transparent mb-0 sm:mb-10">
              <h1 className="dark:text-gray-300">Services</h1>
              <svg
                viewBox="0 0 95 3.2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="-ml-5"
              >
                <line
                  x1="5"
                  y1="5.25"
                  x2="95"
                  y2="5.25"
                  stroke="transparent"
                  strokeWidth="5"
                />
                <animated.line
                  x1="5"
                  y1="5.25"
                  x2={indicatorWidth}
                  y2="5.25"
                  stroke="#3f9eca"
                  strokeWidth="5"
                />
              </svg>

              <ul className="dark:text-gray-500 mt-2 text-sm">
                <li className="mt-4 mb-6 flex justify-between">
                  <p>Web projects</p>
                  <p>20%</p>
                </li>

                <li className="mb-6 flex justify-between">
                  <p>Mobile App</p>
                  <p>45%</p>
                </li>
                <li className="mb-6 flex justify-between">
                  <p>Graphic Design</p>
                  <p>10%</p>
                </li>
                <li className="mb-6 flex justify-between">
                  <p>Marketing</p>
                  <p>25%</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// function RecentTL() {
//   return (
//     <div className="flex p-4 flex-col h-full">
//       <div className="flex justify-between items-center">
//         <div className="text-zinc-900/90 dark:text-gray-300 text-lg">
//           Recent activities
//         </div>
//         <Icon path="res-react-dash-plus" className="w-5 h-5" />
//       </div>

//       <ol class="relative border-l border-gray-200 dark:border-sky-700 mt-4">
//         <li class="mb-10 ml-4">
//           <div class="absolute w-2 h-2 bg-gray-200 rounded-full mt-1 -left-1 border border-white dark:border-sky-400 dark:bg-sky-400"></div>
//           <time class="mb-1 text-sm font-normal leading-none text-zinc-700/90 dark:text-gray-500">
//             2 min atrás
//           </time>
//           <h3 class="text-base font-semibold text-gray-900 dark:text-white">
//             Application UI code in Tailwind CSS
//           </h3>
//           <p class="mb-4 text-sm font-normal text-gray-500 dark:text-gray-400">
//             Get access to over 20+ pages including a dashboard layout
//           </p>
//         </li>
//         <li class="mb-10 ml-4">
//           <div class="absolute w-2 h-2 bg-gray-200 rounded-full mt-1 -left-1 border border-white dark:border-sky-400 dark:bg-sky-400"></div>
//           <time class="mb-1 text-sm font-normal leading-none text-zinc-700/90 dark:text-gray-500">
//             Ontem
//           </time>
//           <h3 class="text-base font-semibold text-gray-900 dark:text-white">
//             Marketing UI design in Figma
//           </h3>
//           <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
//             All of the pages and components are first designed in Figma
//           </p>
//         </li>
//         <li class="ml-4">
//           <div class="absolute w-2 h-2 bg-gray-200 rounded-full mt-1 -left-1 border border-white dark:border-sky-400 dark:bg-sky-400"></div>
//           <time class="mb-1 text-sm font-normal leading-none text-zinc-700/90 dark:text-gray-500">
//             Há uma semana
//           </time>
//           <h3 class="text-base font-semibold text-gray-900 dark:text-white">
//             E-Commerce UI code in Tailwind CSS
//           </h3>
//           <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
//             Get started with web components and interactive elements
//           </p>
//         </li>
//       </ol>
//     </div>
//   );
// }

function AllTasks() {
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

  return (
    <div className="flex p-4 flex-col h-full">
      <div className="flex justify-between items-center">
        <div className="text-zinc-900/90 dark:text-gray-300 text-lg mb-4">
          All tasks
        </div>
      </div>

      <Kanban />

      {/* <div className="flex flex-wrap flex-col-3 justify-between dark:text-gray-300 mt-4 mb-20">
        // To do tasks 
        <div className="w-full lg:w-1/3 px-6">
          <h1 className="text-center text-lg flex justify-center">
            {" "}
            To Do
            <div className="flex sm:hidden xl:flex bg-purple-600  w-5 h-5 flex items-center justify-center rounded-full mt-1 mr-2 ml-2 text-base">
              {totalBacklogs}
            </div>
          </h1>

          <Fragment>
            {tasksData
              .filter((tasks) => tasks.status === "To do")
              .map((filteredTask) => (
                <Accordion
                  open={open === filteredTask.id}
                  animate={customAnimation}
                  onClick={() => handleOpen(filteredTask.id)}
                  className="my-4 border-0"
                >
                  <AccordionHeader className="bg-zinc-300/50 dark:bg-zinc-800/60 rounded-xl px-4 text-[16px] font-[400] dark:font-light border-b-0 text-purple-600 dark:text-purple-500 shadow-lg ring-1 ring-black ring-opacity-5">
                    {filteredTask.title}
                  </AccordionHeader>
                  <AccordionBody>
                    <p className="text-left text-sm dark:text-sky-300">
                      {filteredTask.customer}
                    </p>
                    <h1 className="text-left text-[16px]">
                      {filteredTask.description}
                    </h1>

                    // Due 
                    <div className="flex items-center text-left mt-2">
                      <CalendarIcon className="w-4 h-4 text-sky-500 mr-1" />
                      <p className="dark:text-gray-500 text-sm">
                        {filteredTask.due}
                      </p>
                    </div>

                    // Project Image
                    <div class="flex justify-center items-center w-full mt-4">
                     <img src={filteredTask.img} className="rounded-lg" alt="task img" />
                    </div>

                    <div className="flex justify-between items-center w-full mt-4">
                      // Teammates 
                      <div class="flex -space-x-4 items-center">
                        <img
                          class="w-8 h-8 rounded-full border-2 border-white"
                          src={filteredTask.teammate1}
                          alt="teammate img"
                        />
                        <img
                          class="w-8 h-8 rounded-full border-2 border-white"
                          src={filteredTask.teammate2}
                          alt=""
                        />
                        <img
                          class="w-8 h-8 rounded-full border-2 border-white"
                          src={filteredTask.teammate3}
                          alt=""
                        />
                      </div>
                      // Files 
                      {tasksData.files > 0 ? (
                        <div className="flex items-center">
                          <LinkIcon className="w-4 h-4 text-sky-500 mr-1" />
                          {filteredTask.files}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </AccordionBody>
                </Accordion>
              ))}
          </Fragment>
        </div>

        // In Progress tasks 
        <div className="w-full lg:w-1/3 text-center px-6">
          <h1 className="text-center text-lg flex justify-center">
            {" "}
            In Progress
            <div className="flex sm:hidden xl:flex bg-sky-600  w-5 h-5 flex items-center justify-center rounded-full mt-1 mr-2 ml-2 text-base">
              {totalInProgress}
            </div>
          </h1>

          <Fragment>
            {tasksData
              .filter((tasks) => tasks.status === "in progress")
              .map((filteredTask) => (
                <Accordion
                  open={open === filteredTask.id}
                  animate={customAnimation}
                  onClick={() => handleOpen(filteredTask.id)}
                  className="my-4 border-0"
                >
                  <AccordionHeader className="bg-zinc-300/50 dark:bg-zinc-800/60 rounded-xl px-4 text-[16px] font-[400] dark:font-light border-b-0 text-sky-500 dark:text-sky-500 shadow-lg ring-1 ring-black ring-opacity-5">
                    {filteredTask.title}
                  </AccordionHeader>
                  <AccordionBody>
                    <p className="text-left text-sm dark:text-sky-300">
                      {filteredTask.customer}
                    </p>
                    <h1 className="text-left text-[16px]">
                      {filteredTask.description}
                    </h1>

                    // Due 
                    <div className="flex items-center text-left mt-2">
                      <CalendarIcon className="w-4 h-4 text-sky-500 mr-1" />
                      <p className="dark:text-gray-500 text-sm">
                        {filteredTask.due}
                      </p>
                    </div>

                    // Project Image 
                    <div class="flex justify-center items-center w-full mt-4">
                      <img src={filteredTask.img} className="rounded-lg" alt="task img" />
                    </div>

                    <div className="flex justify-between items-center w-full mt-4">
                     // Teammates
                      <div class="flex -space-x-4 items-center">
                        <img
                          class="w-8 h-8 rounded-full border-2 border-white"
                          src={filteredTask.teammate1}
                          alt=""
                        />
                        <img
                          class="w-8 h-8 rounded-full border-2 border-white"
                          src={filteredTask.teammate2}
                          alt=""
                        />
                        <img
                          class="w-8 h-8 rounded-full border-2 border-white"
                          src={filteredTask.teammate3}
                          alt=""
                        />
                      </div>
                      //Files 
                      <div className="flex items-center">
                        <LinkIcon className="w-4 h-4 text-sky-500 mr-1" />
                        {filteredTask.files}
                      </div>
                    </div>
                  </AccordionBody>
                </Accordion>
              ))}
          </Fragment>
        </div>

        // Done tasks 
        <div className="w-full lg:w-1/3 text-center px-6">
          <h1 className="text-center text-lg flex justify-center">
            Done
            <div className="flex sm:hidden xl:flex bg-lime-600  w-5 h-5 flex items-center justify-center rounded-full mt-1 mr-2 ml-2 text-base">
              {totalCompleted}
            </div>
          </h1>

          <Fragment>
            {tasksData
              .filter((tasks) => tasks.status === "done")
              .map((filteredTask) => (
                <Accordion
                  open={open === filteredTask.id}
                  animate={customAnimation}
                  onClick={() => handleOpen(filteredTask.id)}
                  className="my-4 border-0"
                >
                  <AccordionHeader className="bg-zinc-300/50 dark:bg-zinc-800/60 rounded-xl px-4 text-[16px] font-[400] dark:font-light border-b-0 text-lime-600 dark:text-lime-500 shadow-lg ring-1 ring-black ring-opacity-5">
                    {filteredTask.title}
                  </AccordionHeader>
                  <AccordionBody>
                    <p className="text-left text-sm dark:text-sky-300">
                      {filteredTask.customer}
                    </p>
                    <h1 className="text-left text-[16px]">
                      {filteredTask.description}
                    </h1>

                    // Due 
                    <div className="flex items-center text-left mt-2">
                      <CalendarIcon className="w-4 h-4 text-sky-500 mr-1" />
                      <p className="dark:text-gray-500 text-sm">
                        {filteredTask.due}
                      </p>
                    </div>

                    // Project Image 
                    <div class="flex justify-center items-center w-full mt-4">
                      <img src={filteredTask.img} className="rounded-lg" alt="task img" />
                    </div>

                    <div className="flex justify-between items-center w-full mt-4">
                      // Teammates 
                      <div class="flex -space-x-4 items-center">
                        <img
                          class="w-8 h-8 rounded-full border-2 border-white"
                          src={filteredTask.teammate1}
                          alt=""
                        />
                        <img
                          class="w-8 h-8 rounded-full border-2 border-white"
                          src={filteredTask.teammate2}
                          alt=""
                        />
                        <img
                          class="w-8 h-8 rounded-full border-2 border-white"
                          src={filteredTask.teammate3}
                          alt=""
                        />
                      </div>
                      // Files 
                      <div className="flex items-center">
                        <LinkIcon className="w-4 h-4 text-sky-500 mr-1" />
                        {filteredTask.files}
                      </div>
                    </div>
                  </AccordionBody>
                </Accordion>
              ))}
          </Fragment>
        </div>
      </div> */}
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
                <div className="w-72 h-8 rounded-lg container" />
              </div>
              <div className="flex items-center">
                <div className="w-36 h-6 rounded-lg container" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-2 lg:w-full">
          <div className="rounded-lg bg-card h-auto transition duration-200 bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-zinc-900">
            <div className="flex p-4 flex-col h-full">
              <div className="flex justify-between items-center">
                {/* Title */}
                <div className="w-24 h-8 rounded-lg container" />
              </div>
              <div className="flex flex-wrap flex-col-3 justify-between dark:text-gray-300 mt-12">
                {/* To do tasks */}
                <div className="w-full lg:w-1/3 px-6">
                  <div className="w-36 h-8 rounded-lg mx-auto container" />

                  <Fragment>
                    {tasksData
                      .filter((tasks) => tasks.status === "To do")
                      .map((filteredTask) => (
                        <div className="my-4 border-0">
                          <div className="w-full h-14 container rounded-lg px-4 " />
                        </div>
                      ))}
                  </Fragment>
                </div>

                {/* In Progress tasks */}
                <div className="w-full lg:w-1/3 text-center px-6">
                  <div className="w-36 h-8 rounded-lg mx-auto container" />

                  <Fragment>
                    {tasksData
                      .filter((tasks) => tasks.status === "in progress")
                      .map((filteredTask) => (
                        <div className="my-4 border-0">
                          <div className="w-full h-14 container rounded-lg px-4 " />
                        </div>
                      ))}
                  </Fragment>
                </div>

                {/* Done tasks */}
                <div className="w-full lg:w-1/3 text-center px-6">
                  <div className="w-36 h-8 rounded-lg mx-auto container" />

                  <Fragment>
                    {tasksData
                      .filter((tasks) => tasks.status === "done")
                      .map((filteredTask) => (
                        <div className="my-4 border-0">
                          <div className="w-full h-14 container rounded-lg px-4 " />
                        </div>
                      ))}
                  </Fragment>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-2 lg:w-full">
          <div className="rounded-lg bg-card transition duration-200 h-90 bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-zinc-900">
            <div className="w-full h-full p-4">
              <div className="w-full h-full flex flex-col xl:flex-row">
                {/* Left column */}
                <div className="w-full h-full xl:w-1/2 xl:h-full">
                  <div className="w-40 h-8 rounded-lg container" />
                  <div className="w-full h-full flex flex-col md:flex-row md:mb-6 lg:mb-6 mb-0 xl:flex-row mt-10">
                    <div className="w-full md:w-1/2 xl:w-1/3 xl:mx-auto 2xl:w-1/2">
                      <div className="w-40 h-40 rounded-full mx-auto mt-10 container" />
                    </div>
                    <div className="lg:w-1/2 xl:w-1/3 xl:mx-auto xl:px-0 2xl:w-1/2 h-full px-10 2xl:pr-20 pt-6 bg:transparent mb-0 sm:mb-10">
                      <div className="w-80 h-48 rounded-lg -ml-10 mt-4 container" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="w-full p-2 lg:w-1/5">
          <div className="rounded-lg bg-card overflow-hidden transition duration-200 bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-zinc-900 px-4 py-6">
            
            <div className="w-32 h-8 rounded-lg container" />


            <div className="w-20 h-4 rounded-lg container mt-6" />
            <div className="w-full h-6 rounded-lg container mt-2" />
            <div className="w-full h-4 rounded-lg container mt-2" />

            <div className="w-20 h-4 rounded-lg container mt-6" />
            <div className="w-full h-6 rounded-lg container mt-2" />
            <div className="w-full h-4 rounded-lg container mt-2" />

            <div className="w-20 h-4 rounded-lg container mt-6" />
            <div className="w-full h-6 rounded-lg container mt-2" />
            <div className="w-full h-4 rounded-lg container mt-2" />


          </div>
        </div> */}
      </div>
    </div>
  );
}
