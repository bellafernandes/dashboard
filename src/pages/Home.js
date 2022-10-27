import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import React, { useState, useCallback, PureComponent } from "react";
import ReactDOM, { render } from "react-dom";
import { useSpring, animated, config } from "react-spring";
import Calendar from "react-calendar";
import Sidebar from "../components/Sidebar";

import { CircularProgressbar } from "react-circular-progressbar";

import ProgressProvider from "../components/ProgressProvider";

import "flowbite";

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

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import "./styles.css";

const pi = Math.PI;

const graphData = ["Seg", "Ter", "Qua", "Qui", "Sex"].map((i) => {
  const revenue = 500 + Math.random() * 2000;
  const expectedRevenue = Math.max(revenue + (Math.random() - 0.5) * 2000, 0);
  return {
    name: i,
    revenue,
    expectedRevenue,
    sales: Math.floor(Math.random() * 500),
  };
});

const data = [
  {
    name: "Seg",
    masc: 4000,
    fem: 2400,
    amt: 2400,
  },
  {
    name: "Ter",
    masc: 3000,
    fem: 1398,
    amt: 2210,
  },
  {
    name: "Qua",
    masc: 2000,
    fem: 9800,
    amt: 2290,
  },
  {
    name: "Qui",
    masc: 2780,
    fem: 3908,
    amt: 2000,
  },
  {
    name: "Sex",
    masc: 1890,
    fem: 4800,
    amt: 2181,
  },
];

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
  const [date, setDate] = useState(new Date());

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
        <div className="w-full p-2 lg:w-1/3">
          <div className="rounded-lg bg-card h-96 transition duration-200 bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-zinc-900">
            <Clients />
          </div>
        </div>
        <div className="w-full p-2 lg:w-1/3">
          <div className="rounded-lg bg-card h-96 transition duration-200 bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-zinc-900">
            <Team />
          </div>
        </div>

        <div className="w-full p-2 lg:w-1/3">
          <div className="rounded-lg bg-card overflow-hidden h-96 transition duration-200 bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-zinc-900">
            <Notifications />
          </div>
        </div>
      </div>
    </div>
  );
}

function Graph() {
  const CustomTooltip = () => (
    <div className="rounded-xl overflow-hidden tooltip-head">
      <div className="flex items-center justify-between p-2">
        <div className="text-zinc-900/90 dark:text-gray-300">Receita</div>
        <Icon path="res-react-dash-options" className="w-2 h-2" />
      </div>
      <div className="tooltip-body text-center p-3">
        <div className="text-white font-bold">R$1300.50</div>
        <div className="">Receita de 230 vendas</div>
      </div>
    </div>
  );
  return (
    <div className="flex p-4 h-full flex-col">
      <div className="">
        <div className="flex items-center">
          <div className="text-white flex items-center">
            <span className="text-zinc-900/90 dark:text-gray-300 font-medium">
              Receita (R$)
            </span>
            <Icon path={"res-react-dash-bull"} className="w-6 h-6 ml-4 mr-2" />
          </div>
          <span className="text-green-400">+0,3%</span>
          <div className="flex-grow" />

          {/* <svg
            aria-hidden="true"
            class="w-5 h-5 text-gray-200 dark:text-gray-600 fill-[#6B8DE3]"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              // fill="currentColor"
              fill="currentFill"
            />
          </svg> */}

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
          <div className="ml-1 mr-4 dark:text-gray-300">Esta semana</div>
          {/* <svg
            aria-hidden="true"
            class="w-5 h-5 text-gray-200 dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
          </svg> */}

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
          <div className="ml-1 dark:text-gray-300">Semana passada</div>
          {/* <div className="ml-6 w-5 h-5 flex justify-center items-center rounded-full icon-background">
            ?
          </div> */}
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

function Notifications() {
  const data = [
    {
      label: "Ajuda",
      value: "ajuda",

      icon1: "../../assets/shop-icon.png",
      title1: "Ofertas",
      desc1: "Veja como atrair mais clientes",

      icon2: "../../assets/invoice-icon.png",
      title2: "Faturas",
      desc2: "Emita faturas automaticamente",

      icon3: "../../assets/chat-icon.png",
      title3: "Suporte",
      desc3: "Veja as solicitações dos seus clientes",
    },
    {
      label: "Equipe",
      value: "equipe",

      icon1: "../../assets/profile-picture-2.jpg",
      title1: "Equipe",
      desc1: "Jim Morrison entrou para a equipe",

      icon2: "../../assets/profile-picture-3.jpg",
      title2: "Tarefas",
      desc2: "Lucy Roberts finalizou uma tarefa",

      icon3: "../../assets/profile-picture-4.jpg",
      title3: "Vendas",
      desc3: "Alison Parker realizou uma venda",
    },
  ];

  return (
    <div className="flex p-4 flex-col h-full">
      <Tabs value="ajuda">
        <TabsHeader className="bg-zinc-300 dark:bg-zinc-600 text-zinc-900/90 dark:text-gray-800">
          {data.map(({ label, value }) => (
            <Tab key={value} value={value} className="font-medium">
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(
            ({
              value,
              icon1,
              title1,
              desc1,
              icon2,
              title2,
              desc2,
              icon3,
              title3,
              desc3,
            }) => (
              <TabPanel key={value} value={value}>
                <div className="flex items-center">
                  <img
                    src={icon1}
                    className="w-10 h-10 rounded-full mt-4 mr-4"
                  />
                  <div className="flex flex-col mt-4">
                    <span className="text-zinc-900/90 dark:text-gray-200 font-medium">
                      {title1}
                    </span>
                    <span className="text-zinc-700/90 dark:text-gray-400 font-normal">
                      {desc1}
                    </span>
                  </div>
                </div>

                <div className="flex items-center">
                  <img
                    src={icon2}
                    className="w-10 h-10 rounded-full mt-4 mr-4"
                  />
                  <div className="flex flex-col mt-4">
                    <span className="text-zinc-900/90 dark:text-gray-200 font-medium">
                      {title2}
                    </span>
                    <span className="text-zinc-700/90 dark:text-gray-400 font-normal">
                      {desc2}
                    </span>
                  </div>
                </div>

                <div className="flex items-center">
                  <img
                    src={icon3}
                    className="w-10 h-10 rounded-full mt-4 mr-4"
                  />
                  <div className="flex flex-col mt-4">
                    <span className="text-zinc-900/90 dark:text-gray-200 font-medium">
                      {title3}
                    </span>
                    <span className="text-zinc-700/90 dark:text-gray-400 font-normal">
                      {desc3}
                    </span>
                  </div>
                </div>
              </TabPanel>
            )
          )}
        </TabsBody>
      </Tabs>
    </div>
  );
}

function Activities() {
  // const [valueEnd, setValueEnd] = React.useState(21, 67);

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
          Tarefas concluídas
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
        <span className="flex flex-wrap align-middle ml-4">
          Metas alcançadas
        </span>
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
          Clientes satisfeitos
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
          Calendário
        </div>
      </div>

      <Calendar className="mx-auto dark:text-gray-300" />

      <div className="flex-grow" />
      <div className="flex justify-center">
        <div className="dark:text-gray-300 sidebar-item">
          <a href="/CalendarTasks">Ver tudo</a>
        </div>
      </div>
    </div>
  );
}

function Clients() {
  return (
    <div className="flex p-4 flex-col h-full">
      <div className="flex justify-between items-center">
        <div className="text-zinc-900/90 dark:text-gray-300 font-medium mb-4">
          Clientes
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="fem" fill="#484091" />
          <Bar dataKey="masc" fill="#8e6dca" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function Team() {
  const [date, setDate] = useState(new Date());

  const {
    dashOffset,
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
          Equipe B Vendas
        </div>
        {/* <Icon path="res-react-dash-plus" className="w-5 h-5" /> */}
      </div>

      <div class="overflow-hidden relative">
        <table class="w-full text-sm text-center text-zinc-900/90 dark:text-gray-300">
          <thead class="border-b text-xs uppercase bg-transparent">
            <tr>
              <th scope="col" className="py-3 px-6">
                <span className="font-medium">Nome</span>
              </th>
              <th scope="col" className="py-3 px-6">
                <span className="font-medium">Progresso</span>
              </th>
              <th scope="col" className="py-3 px-6">
                <span className="font-medium">Projetos</span>
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

ReactDOM.render(<Home />, document.getElementById("root"));
