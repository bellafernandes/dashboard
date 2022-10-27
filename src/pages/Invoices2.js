import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import { React, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { useSpring, animated, config } from "react-spring";
import Sidebar from "../components/Sidebar";

import { ChevronRightIcon } from '@heroicons/react/solid';

import "./styles.css";


const map = (value, sMin, sMax, dMin, dMax) => {
  return dMin + ((value - sMin) / (sMax - sMin)) * (dMax - dMin);
};
const pi = Math.PI;
const tau = 2 * pi;

const invoiceData = [
  {
    id: 1,
    code: "RT3080",
    due: "19 Ago 2022",
    name: "Jensen Huang",
    value: "R$ 1.800,90",
    status: "Pago",
    paid: true,
  },

  {
    id: 2,
    code: "XM9141",
    due: "20 Set 2022",
    name: "Alex Grim",
    value: "R$ 556,00",
    status: "Pendente",
    paid: false,
  },

  {
    id: 3,
    code: "RG0314",
    due: "01 Out 2022",
    name: "John Morrison",
    value: "14.002,35",
    status: "Pago",
    paid: true,
  },
];

const filterData = [
  {
    status: ["Pago", "Pendente"]
  },
]

export default function Invoices() {
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
    <div className="flex w-full">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className=" h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
        <div className="w-full sm:flex p-2 items-end">
          <div className="sm:flex-grow flex justify-between">
            <div className="">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-white">Olá, Isabella</div>
                {/* <div className="flex items-center p-2 bg-card ml-2 rounded-xl">
                  <Icon path="res-react-dash-premium-star" />

                  <div className="ml-2 font-bold text-premium-yellow">
                    PREMIUM
                  </div>
                </div> */}
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
                    <p className="text-center">{date.toDateString()}</p>
                  )}
                </div>
              </div>
            </div>
            <IconButton
              icon="res-react-dash-sidebar-open"
              className="block sm:hidden"
              onClick={onSidebarHide}
            />
          </div>
          <div className="w-full sm:w-56 mt-4 sm:mt-0 relative">
            <Icon
              path="res-react-dash-search"
              className="w-5 h-5 search-icon left-3 absolute"
            />
            <form action="#" method="POST">
              <input
                type="text"
                name="company_website"
                id="company_website"
                className="pl-12 py-2 pr-2 block w-full rounded-lg border-gray-300 bg-card"
                placeholder="buscar"
              />
            </form>
          </div>
        </div>

        <div className="w-full h-full p-2">
          <div className="rounded-lg bg-card h-full">
            <div class="overflow-x-auto relative">
              {invoiceData.map(({ id, code, due, name, value, status, paid }) => (
                <InvoiceTab
                  id={id}
                  code={code}
                  due={due}
                  name={name}
                  value={value}
                  status={status}
                  paid={paid}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InvoiceTab({ code, name, due, value, paid, status }) {
  return (
    <div className="flex flex-col px-10 w-2/3 mx-auto">
      <div className="flex flex-row justify-between mt-10 bg-indigo-900 items-center px-10 py-4 text-gray-300 rounded-lg">
        <span className="flex"><p className="purple-txt">#</p>{code}</span>
        <span>{due}</span>
        <span>{name}</span>
        <span className="">{value}</span>
        <span className="flex items-center">
          <div
            className={clsx(
              paid ? 'text-green-500' : 'text-red-500 bg-orange-700/75',
              'font-bold',
              'text-lg rounded-lg px-5 py-2.5',
              //                                               focus:ring-4 focus:ring-blue-300 font-medium 
              //                                               rounded-lg text-sm px-5 py-2.5  
              //                                               dark:bg-blue-600 dark:hover:bg-blue-700 
              //                                               focus:outline-none dark:focus:ring-blue-800
            )}
            
            
            // "text-white bg-blue-700 w-min flex justify-center
            //                                               focus:ring-4 focus:ring-blue-300 font-medium 
            //                                               rounded-lg text-sm px-5 py-2.5  
            //                                               dark:bg-blue-600 dark:hover:bg-blue-700 
            //                                               focus:outline-none dark:focus:ring-blue-800"
          >
            <p className="justify-center">{status}</p>
          </div>
          <ChevronRightIcon className="w-6 h-6 ml-4" />
        </span>
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
      <img
        src={`https://assets.codepen.io/3685267/${icon}.svg`}
        alt=""
        className="w-full h-full"
      />
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

ReactDOM.render(<Invoices />, document.getElementById("root"));
