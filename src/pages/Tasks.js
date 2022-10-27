import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import React, {
  useRef,
  useState,
  useCallback,
  Fragment,
  PureComponent,
} from "react";

import { useSpring, animated, config } from "react-spring";

import Sidebar from "../components/Sidebar";

// Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button,
  Tooltip,
} from "@material-tailwind/react";

import "flowbite";

import { ResponsiveContainer, PieChart, Pie, Sector } from "recharts";

import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
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
    value,
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

const importantTasksData = [
  {
    id: 1,
    imgTeam1: "../../assets/profile-picture-4.jpg",
    imgTeam2: "../../assets/profile-picture-3.jpg",
    imgTeam3: "../../assets/profile-picture-5.jpg",
    imgTeam4: "../../assets/profile-picture-2.jpg",
    deadline: "13/03/2023",
    title: "Desenvolvimento de app nativo",
    task1: "Reunião com a equipe",
    task2: "Criar o UI/UX design",
    task3: "Buscar referências de design",
  },
  {
    id: 2,
    imgTeam1: "../../assets/profile-picture-4.jpg",
    imgTeam2: "../../assets/profile-picture-3.jpg",
    imgTeam3: "../../assets/profile-picture-5.jpg",
    imgTeam4: "../../assets/profile-picture-2.jpg",
    deadline: "13/03/2023",
    title: "Desenvolvimento de app nativo",
    task1: "Reunião com a equipe",
    task2: "Criar o UI/UX design",
    task3: "Buscar referências de design",
  },
  {
    id: 3,
    imgTeam1: "../../assets/profile-picture-4.jpg",
    imgTeam2: "../../assets/profile-picture-3.jpg",
    imgTeam3: "../../assets/profile-picture-5.jpg",
    imgTeam4: "../../assets/profile-picture-2.jpg",
    deadline: "13/03/2023",
    title: "Desenvolvimento de app nativo",
    task1: "Reunião com a equipe",
    task2: "Criar o UI/UX design",
    task3: "Buscar referências de design",
  },
  {
    id: 4,
    imgTeam1: "../../assets/profile-picture-4.jpg",
    imgTeam2: "../../assets/profile-picture-3.jpg",
    imgTeam3: "../../assets/profile-picture-5.jpg",
    imgTeam4: "../../assets/profile-picture-2.jpg",
    deadline: "13/03/2023",
    title: "Desenvolvimento de app nativo",
    task1: "Reunião com a equipe",
    task2: "Criar o UI/UX design",
    task3: "Buscar referências de design",
  },
  {
    id: 5,
    imgTeam1: "../../assets/profile-picture-4.jpg",
    imgTeam2: "../../assets/profile-picture-3.jpg",
    imgTeam3: "../../assets/profile-picture-5.jpg",
    imgTeam4: "../../assets/profile-picture-2.jpg",
    deadline: "13/03/2023",
    title: "Desenvolvimento de app nativo",
    task1: "Reunião com a equipe",
    task2: "Criar o UI/UX design",
    task3: "Buscar referências de design",
  },
];

const tasksData = [
  {
    id: 1,
    cliente: "visari studio",
    titulo: "Identidade Visual",
    descricao: "Lorem ipsum",
    prazo: "22 Ago 2022",
    status: "Concluída",
    paid: true,
  },
  {
    id: 2,
    cliente: "visari studio",
    titulo: "Identidade Visual",
    descricao: "Lorem ipsum",
    prazo: "19 Ago 2022",
    status: "Concluída",
    paid: true,
  },
  {
    id: 3,
    cliente: "visari studio",
    titulo: "Identidade Visual",
    descricao: "Lorem ipsum",
    prazo: "19 Ago 2022",
    status: "Em andamento",
    paid: true,
  },
  {
    id: 4,
    cliente: "visari studio",
    titulo: "Identidade Visual",
    descricao: "Lorem ipsum",
    prazo: "19 Jul 2022",
    status: "Atrasada",
    paid: true,
  },
  {
    id: 5,
    cliente: "visari studio",
    titulo: "Identidade Visual",
    descricao: "Lorem ipsum",
    prazo: "26 Jul 2022",
    status: "Atrasada",
    paid: true,
  },
  {
    id: 6,
    cliente: "visari studio",
    titulo: "Identidade Visual",
    descricao: "Lorem ipsum",
    prazo: "02 Set 2022",
    status: "Concluída",
    paid: true,
  },
  {
    id: 7,
    cliente: "visari studio",
    titulo: "Identidade Visual",
    descricao: "Lorem ipsum",
    prazo: "14 Ago 2022",
    status: "Concluída",
    paid: true,
  },
];

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
                  Gerenciamento de Tarefas
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
          <div className="rounded-lg bg-card transition duration-200 h-90 bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-zinc-900">
            <Information />
          </div>
        </div>
        <div className="w-full p-2 lg:w-4/5">
          <div className="rounded-lg bg-card h-auto transition duration-200 bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-zinc-900">
            <AllTasks />
          </div>
        </div>
        <div className="w-full p-2 lg:w-1/5">
          <div className="rounded-lg bg-card overflow-hidden transition duration-200 bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-zinc-900">
            <RecentTL />
          </div>
        </div>
      </div>
    </div>
  );
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
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const { dashOffset, indicatorWidth, percentage } = useSpring({
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
            Resumo de Projetos
          </h1>
          <div className="w-full h-full flex flex-col md:flex-row md:mb-6 lg:mb-6 mb-0 xl:flex-row mt-10">
            <div className="w-full md:w-1/2 xl:w-1/3 xl:mx-auto 2xl:w-1/2">
              <Chart />
            </div>
            <div className="lg:w-1/2 xl:w-1/3 xl:mx-auto xl:px-0 2xl:w-1/2 h-full px-10 2xl:pr-20 pt-6 bg:transparent mb-0 sm:mb-10">
              <h1 className="dark:text-gray-300">Serviços</h1>
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
                  <p>Projetos Web</p>
                  <p>20%</p>
                </li>

                <li className="mb-6 flex justify-between">
                  <p>Mobile App</p>
                  <p>45%</p>
                </li>
                <li className="mb-6 flex justify-between">
                  <p>Design Gráfico</p>
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

        {/* COLUNA DA DIREITA */}
        <div className="w-full xl:w-1/2 h-full">
          <div className="flex justify-between w-full">
            <div>
              <h1 className="text-zinc-900/90 dark:text-gray-300 text-lg">
                Tarefas importantes
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
                1280: {
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
                <SwiperSlide className="mr-6">
                  <div className="bg-purple-500 w-full h-full p-4">
                    <div className="flex flex-col-2 justify-between">
                      <div>
                        <h1 className="text-gray-300 text-sm mb-4">Membros:</h1>
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
                        <h1 className="text-gray-300 text-sm mb-4">Prazo:</h1>
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
                      <button className="flex justify-between text-sm text-gray-300 w-full items-center mt-6 bg-purple-400/50 hover:bg-purple-600/50 transition ease-in-out delay-50 p-4">
                        <div>Ver detalhes</div>{" "}
                        <ArrowRightIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecentTL() {
  return (
    <div className="flex p-4 flex-col h-full">
      <div className="flex justify-between items-center">
        <div className="text-zinc-900/90 dark:text-gray-300 text-lg">
          Atividades recentes
        </div>
        <Icon path="res-react-dash-plus" className="w-5 h-5" />
      </div>

      <ol class="relative border-l border-gray-200 dark:border-sky-700 mt-4">
        <li class="mb-10 ml-4">
          <div class="absolute w-2 h-2 bg-gray-200 rounded-full mt-1 -left-1 border border-white dark:border-sky-400 dark:bg-sky-400"></div>
          <time class="mb-1 text-sm font-normal leading-none text-zinc-700/90 dark:text-gray-500">
            2 min atrás
          </time>
          <h3 class="text-base font-semibold text-gray-900 dark:text-white">
            Application UI code in Tailwind CSS
          </h3>
          <p class="mb-4 text-sm font-normal text-gray-500 dark:text-gray-400">
            Get access to over 20+ pages including a dashboard layout
          </p>
        </li>
        <li class="mb-10 ml-4">
          <div class="absolute w-2 h-2 bg-gray-200 rounded-full mt-1 -left-1 border border-white dark:border-sky-400 dark:bg-sky-400"></div>
          <time class="mb-1 text-sm font-normal leading-none text-zinc-700/90 dark:text-gray-500">
            Ontem
          </time>
          <h3 class="text-base font-semibold text-gray-900 dark:text-white">
            Marketing UI design in Figma
          </h3>
          <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
            All of the pages and components are first designed in Figma
          </p>
        </li>
        <li class="ml-4">
          <div class="absolute w-2 h-2 bg-gray-200 rounded-full mt-1 -left-1 border border-white dark:border-sky-400 dark:bg-sky-400"></div>
          <time class="mb-1 text-sm font-normal leading-none text-zinc-700/90 dark:text-gray-500">
            Há uma semana
          </time>
          <h3 class="text-base font-semibold text-gray-900 dark:text-white">
            E-Commerce UI code in Tailwind CSS
          </h3>
          <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
            Get started with web components and interactive elements
          </p>
        </li>
      </ol>
    </div>
  );
}

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
    (obj) => obj.status === "Atrasada"
  ).length;

  const totalInProgress = tasksData.filter(
    (obj) => obj.status === "Em andamento"
  ).length;

  const totalCompleted = tasksData.filter(
    (obj) => obj.status === "Concluída"
  ).length;

  return (
    <div className="flex p-4 flex-col h-full">
      <div className="flex justify-between items-center">
        <div className="text-zinc-900/90 dark:text-gray-300 text-lg mb-4">
          Todas as minhas tarefas
        </div>

        <Tooltip content="Tarefas deste mês" className="mt-4 bg-sky-600">
          <Button className="shadow-inherit">
            <Icon path="res-react-dash-plus" className="w-5 h-5" />
          </Button>
        </Tooltip>
      </div>
      <div className="flex flex-wrap flex-col-3 justify-between dark:text-gray-300 mt-4">
        {/* TAREFAS ATRASADAS */}
        <div className="w-full lg:w-1/3 px-6">
          <h1 className="text-center text-lg flex justify-center">
            {" "}
            Em atraso
            <div className="flex sm:hidden xl:flex bg-purple-600  w-5 h-5 flex items-center justify-center rounded-full mt-1 mr-2 ml-2 text-base">
              {totalBacklogs}
            </div>
          </h1>

          <Fragment>
            {tasksData
              .filter((tasks) => tasks.status === "Atrasada")
              .map((filteredTask) => (
                <Accordion
                  open={open === filteredTask.id}
                  animate={customAnimation}
                  onClick={() => handleOpen(filteredTask.id)}
                  className="my-4 border-0"
                >
                  <AccordionHeader className="bg-zinc-400/50 dark:bg-zinc-800/60 rounded-xl px-4 text-[16px] font-[400] dark:font-light border-b-0 text-purple-600 dark:text-purple-500 shadow-lg ring-1 ring-black ring-opacity-5">
                    {filteredTask.titulo}
                  </AccordionHeader>
                  <AccordionBody>
                    <p className="text-left text-sm dark:text-sky-300">
                      {filteredTask.cliente}
                    </p>
                    <h1 className="text-left text-xl">
                      {filteredTask.descricao}
                    </h1>
                    <p className="text-left text-sm">{filteredTask.prazo}</p>

                    <div class="flex justify-center items-center w-full mt-4">
                      <label
                        for="dropzone-file"
                        class="flex flex-col justify-center items-center w-full h-40 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div class="flex flex-col justify-center items-center pt-5 pb-6">
                          <svg
                            aria-hidden="true"
                            class="mb-3 w-10 h-10 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                          </svg>
                          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span class="font-semibold">
                              Clique para fazer o upload
                            </span>{" "}
                            ou arraste e solte
                          </p>
                          <p class="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input id="dropzone-file" type="file" class="hidden" />
                      </label>
                    </div>
                  </AccordionBody>
                </Accordion>
              ))}
          </Fragment>
        </div>

        {/* TAREFAS EM ANDAMENTO */}
        <div className="w-full lg:w-1/3 text-center px-6">
          <h1 className="text-center text-lg flex justify-center">
            {" "}
            Em andamento
            <div className="flex sm:hidden xl:flex bg-sky-600  w-5 h-5 flex items-center justify-center rounded-full mt-1 mr-2 ml-2 text-base">
              {totalInProgress}
            </div>
          </h1>

          <Fragment>
            {tasksData
              .filter((tasks) => tasks.status === "Em andamento")
              .map((filteredTask) => (
                <Accordion
                  open={open === filteredTask.id}
                  animate={customAnimation}
                  onClick={() => handleOpen(filteredTask.id)}
                  className="my-4 border-0"
                >
                  <AccordionHeader className="bg-zinc-400/50 dark:bg-zinc-800/60 rounded-xl px-4 text-[16px] font-[400] dark:font-light border-b-0 text-sky-500 dark:text-sky-500 shadow-lg ring-1 ring-black ring-opacity-5">
                    {filteredTask.titulo}
                  </AccordionHeader>
                  <AccordionBody>
                    <p className="text-left text-sm dark:text-sky-300">
                      {filteredTask.cliente}
                    </p>
                    <h1 className="text-left text-xl">
                      {filteredTask.descricao}
                    </h1>
                    <p className="text-left text-sm">{filteredTask.prazo}</p>

                    <div class="flex justify-center items-center w-full mt-4">
                      <label
                        for="dropzone-file"
                        class="flex flex-col justify-center items-center w-full h-40 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div class="flex flex-col justify-center items-center pt-5 pb-6">
                          <svg
                            aria-hidden="true"
                            class="mb-3 w-10 h-10 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                          </svg>
                          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span class="font-semibold">
                              Clique para fazer o upload
                            </span>{" "}
                            ou arraste e solte
                          </p>
                          <p class="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input id="dropzone-file" type="file" class="hidden" />
                      </label>
                    </div>
                  </AccordionBody>
                </Accordion>
              ))}
          </Fragment>
        </div>

        {/* TAREFAS CONCLUÍDAS */}
        <div className="w-full lg:w-1/3 text-center px-6">
          <h1 className="text-center text-lg flex justify-center">
            Concluídas
            <div className="flex sm:hidden xl:flex bg-lime-600  w-5 h-5 flex items-center justify-center rounded-full mt-1 mr-2 ml-2 text-base">
              {totalCompleted}
            </div>
          </h1>

          <Fragment>
            {tasksData
              .filter((tasks) => tasks.status === "Concluída")
              .map((filteredTask) => (
                <Accordion
                  open={open === filteredTask.id}
                  animate={customAnimation}
                  onClick={() => handleOpen(filteredTask.id)}
                  className="my-4 border-0"
                >
                  <AccordionHeader className="bg-zinc-400/50 dark:bg-zinc-800/60 rounded-xl px-4 text-[16px] font-[400] dark:font-light border-b-0 text-lime-600 dark:text-lime-500 shadow-lg ring-1 ring-black ring-opacity-5">
                    {filteredTask.titulo}
                  </AccordionHeader>
                  <AccordionBody>
                    <p className="text-left text-sm dark:text-sky-300">
                      {filteredTask.cliente}
                    </p>
                    <h1 className="text-left text-xl">
                      {filteredTask.descricao}
                    </h1>
                    <p className="text-left text-sm">{filteredTask.prazo}</p>

                    <div class="flex justify-center items-center w-full mt-4">
                      <label
                        for="dropzone-file"
                        class="flex flex-col justify-center items-center w-full h-40 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div class="flex flex-col justify-center items-center pt-5 pb-6">
                          <svg
                            aria-hidden="true"
                            class="mb-3 w-10 h-10 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                          </svg>
                          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span class="font-semibold">
                              Clique para fazer o upload
                            </span>{" "}
                            ou arraste e solte
                          </p>
                          <p class="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input id="dropzone-file" type="file" class="hidden" />
                      </label>
                    </div>
                  </AccordionBody>
                </Accordion>
              ))}
          </Fragment>
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

function Image({ path = "1", className = "w-4 h-4" }) {
  return (
    <img
      src={`https://assets.codepen.io/3685267/${path}.jpg`}
      alt=""
      className={clsx(className, "rounded-full")}
    />
  );
}
