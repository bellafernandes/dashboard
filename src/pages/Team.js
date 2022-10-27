import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import { React, useState, useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import { useSpring, animated, config } from "react-spring";
import Sidebar from "../components/Sidebar";

import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/solid";

import "./styles.css";

// const { useSpring, animated, config} = ReactSpring;
// const { LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer, } = Recharts

const employeeData = [
  {
    id: 1,
    name: "Esther Howard",
    position: "Desenvolvedora front-end",
    email: "estherhoward@gmail.com",
    tag: "Equipe",
    tasksCompleted: 3,
    imgId: "../../assets/profile-picture-4.jpg",
  },

  {
    id: 2,
    name: "Brian Connor",
    position: "Desenvolvedor back-end",
    email: "brianconnor@gmail.com",
    tag: "Equipe",
    tasksCompleted: 5,
    imgId: "../../assets/profile-picture-2.jpg",
  },

  {
    id: 3,
    name: "Roberta Fox",
    position: "Gerente de projetos",
    email: "robertafox@gmail.com",
    tag: "Admin",
    tasksCompleted: 1,
    imgId: "../../assets/profile-picture-3.jpg",
  },
  {
    id: 4,
    name: "Lucas Hale",
    position: "Desenvolvedor back-end",
    email: "lucashale@gmail.com",
    tag: "",
    tasksCompleted: 3,
    imgId: "../../assets/profile-picture-5.jpg",
  },
  {
    id: 5,
    name: "Eleanor Pena",
    position: "Desenvolvedora front-end",
    email: "eleanorpena@gmail.com",
    tag: "Equipe",
    tasksCompleted: 5,
    imgId: "../../assets/profile-picture-1.jpg",
  },
  {
    id: 6,
    name: "Marcus Holloway",
    position: "Designer gráfico",
    email: "marcusholloway@gmail.com",
    tag: "Equipe",
    tasksCompleted: 1,
    imgId: "../../assets/profile-picture-6.jpg",
  },
  {
    id: 7,
    name: "Aaron Keener",
    position: "Desenvolvedor mobile",
    email: "aaronkeener@gmail.com",
    tag: "Equipe",
    tasksCompleted: 1,
    imgId: "../../assets/profile-picture-7.jpg",
  },
  {
    id: 8,
    name: "Edward Smith",
    position: "Analista de banco de dados",
    email: "exemplo@gmail.com",
    tag: "",
    tasksCompleted: 1,
    imgId: "../../assets/profile-picture-8.jpg",
  },
  {
    id: 9,
    name: "Sarah Cooper",
    position: "Designer gráfico",
    email: "sarahcooper@gmail.com",
    tag: "Equipe",
    tasksCompleted: 1,
    imgId: "../../assets/profile-picture-9.jpg",
  },
  {
    id: 10,
    name: "Ben Vasquez",
    position: "Analista de banco de dados",
    email: "benvasquez@gmail.com",
    tag: "",
    tasksCompleted: 1,
    imgId: "../../assets/profile-picture-10.jpg",
  },
];



export default function Team() {
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

  // valor da search bar
  const [name, setName] = useState("");

  // resultado da busca
  const [foundUsers, setFoundUsers] = useState(employeeData);

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = employeeData.filter((user) => {
        return user.name.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundUsers(results);
    } else {
      setFoundUsers(employeeData);
      // se a search bar está vazia, mostrará todos os funcionários
    }

    setName(keyword);
  };


  return (
    <div className="flex w-full bg-zinc-300/90 dark:bg-zinc-900/95">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className="flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
        <div className="w-full sm:flex p-2 items-end">
          <div className="sm:flex-grow flex justify-between">
            <div className="-mt-8 sm:-mt-16 absolute">
              <div className="flex items-center">
                <div className="text-md sm:text-lg md:text-2xl text-zinc-900/90 dark:text-gray-200">
                  Funcionários
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
                    <p className="text-xs sm:text-sm md:text-lg text-center dark:text-gray-400">
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

        <div className="w-full h-auto p-2">

          {/* Search bar */}
          <div className="w-full pr-4 sm:pr-0 sm:w-56 mt-10 ml-2 mb-10 relative">
            <Icon
              path="res-react-dash-search"
              className="w-5 h-5 search-icon left-3 absolute"
            />
            <form action="#" method="POST">
              <input
                type="search"
                value={name}
                onChange={filter}
                id="company_website"
                className="pl-12 py-2 pr-2 block w-full rounded-lg border-gray-300 bg-card shadow-lg ring-1 ring-black ring-opacity-5"
                placeholder="buscar por nome"
              />
            </form>
          </div>
          <div className="w-full rounded-lg grid grid-cols-1 md:grid-cols-2 md:gap-1 lg:grid-cols-3 lg:gap-2">
            {/* array de funcionarios com filtro */}

            {foundUsers && foundUsers.length > 0 ? (
              foundUsers.map((employeeData) => (
                <div
                  key={employeeData.id}
                  className="bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-zinc-900 mb-4 mx-2 p-4 user"
                >
                  <div className="flex flex-col-2 justify-between">
                    <div>
                      <img
                        class="w-10 h-10 rounded"
                        src={employeeData.imgId}
                        alt="Default avatar"
                      />
                      <h1 className="dark:text-gray-200 text-lg font-medium mt-1">
                        {employeeData.name}
                      </h1>
                      <p className="dark:text-gray-300 text-sm mb-4">
                        {employeeData.position}
                      </p>
                      <p className="dark:text-gray-300 text-sm mb-4">
                        {employeeData.email}
                      </p>
                    </div>
                    <div className="ml-4">
                      <h1 className="dark:text-gray-300 text-sm mb-4">
                        {employeeData.tag}
                      </h1>
                      <p></p>
                    </div>
                  </div>
                  <div className="w-full h-auto flex justify-between">
                    <button className="w-2/5 text-sm text-gray-300 w-full items-center mt-6 mr-4 bg-purple-500 hover:bg-purple-400 dark:bg-purple-400/50 dark:hover:bg-purple-600/50 transition ease-in-out delay-50 p-4">
                      <p>Ligar</p>
                    </button>

                    <button className="w-2/5 text-sm text-gray-300 w-full items-center mt-6 mr-4 bg-purple-500 hover:bg-purple-400 dark:bg-purple-400/50 dark:hover:bg-purple-600/50 transition ease-in-out delay-50 p-4">
                      <p>Mensagem</p>
                    </button>

                    <button className="w-1/5 text-sm text-gray-300 w-full flex justify-center items-center mt-6 bg-purple-500 hover:bg-purple-400 dark:bg-purple-400/50 dark:hover:bg-purple-600/50 transition ease-in-out delay-50 p-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-[100%] md:w-[200%] lg:w-[302%] bg-red-500 py-4">
                <div className="mx-auto">
                  <h1 className="flex justify-center">
                    Nenhum resultado encontrado
                  </h1>
                </div>
              </div>
            )}
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

function Image({ path = "1", className = "w-4 h-4" }) {
  return (
    <img
      src={`https://assets.codepen.io/3685267/${path}.jpg`}
      alt=""
      className={clsx(className, "rounded-full")}
    />
  );
}

ReactDOM.render(<Team />, document.getElementById("root"));
