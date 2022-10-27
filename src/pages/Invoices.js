import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import React, { Fragment, useRef, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { useSpring, animated, config } from "react-spring";
import Sidebar from "../components/Sidebar";

import { Dialog, Transition } from "@headlessui/react";

import { ExclamationIcon } from "@heroicons/react/outline";

import { ChevronRightIcon } from "@heroicons/react/solid";

import "./styles.css";

const invoiceData = [
  {
    id: 1,
    code: "RT3080",
    due: "19 Ago 2022",
    name: "Jensen Huang",
    value: "1.800,90",
    status: "Pago",
    paid: true,
    birthdate: "1970-04-19T08:56:27Z",
  },
  {
    id: 2,
    code: "XM9141",
    due: "20 Set 2022",
    name: "Alex Grim",
    value: "556,00",
    status: "Pendente",
    paid: false,
    birthdate: "1970-04-19T08:56:27Z",
  },
  {
    id: 3,
    code: "RG0314",
    due: "01 Out 2022",
    name: "John Morrison",
    value: "14.002,35",
    status: "Pago",
    paid: true,
    birthdate: "1970-06-19T08:56:27Z",
  },
  {
    id: 4,
    code: "RT2080",
    due: "12 Out 2022",
    name: "Alysa Werner",
    value: "102,04",
    status: "Pendente",
    paid: false,
    birthdate: "1970-06-19T08:56:27Z",
  },
  {
    id: 5,
    code: "AA1449",
    due: "14 Out 2022",
    name: "Mellisa Clarke",
    value: "4.032,33",
    status: "Pendente",
    paid: false,
    birthdate: "1970-06-19T08:56:27Z",
  },
  {
    id: 6,
    code: "TY9141",
    due: "31 Out 2022",
    name: "Thomas Wayne",
    value: "6.155,91",
    status: "Pendente",
    paid: false,
    birthdate: "1970-06-19T08:56:27Z",
  },
  {
    id: 7,
    code: "VW2353",
    due: "12 Nov 2022",
    name: "Peter Wainwright",
    value: "3.102,04",
    status: "Pago",
    paid: true,
    birthdate: "1970-06-19T08:56:27Z",
  },
];

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

  const [data, setData] = React.useState(invoiceData);

  const [selectMonthFilter, setSelectMonthFilter] = React.useState("");
  const [nameFilter, setNameFilter] = React.useState("");

  const getMonthValue = (dateTime) =>
    dateTime.toLowerCase().split("t")[0].split("-")[1];

  const length = invoiceData.length;

  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  return (
    <div className="flex w-full bg-zinc-300/90 dark:bg-zinc-900/95">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className="h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
        <div className="w-full sm:flex p-2 items-end">
          <div className="sm:flex-grow flex justify-between">
            <div className="-mt-8 sm:-mt-16 absolute">
              <div className="flex items-center">
                <div className="text-md sm:text-lg md:text-2xl text-zinc-900/90 dark:text-gray-200">
                  Gerenciamento de faturas
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

        <div className="w-full h-auto p-2">
          <div className="rounded-lg h-auto pb-10">
            <div className="flex flex-col">
              <div className="w-full lg:w-2/3 mx-auto flex lg:items-center lg:justify-between">
                <div className="min-w-0 flex-1">
                  <h2 className="text-3xl text-zinc-900/90 dark:text-gray-300 font-medium sm:truncate sm:tracking-tight">
                    Faturas
                  </h2>
                  <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <h2 className="dark:text-gray-400">
                        Há {length} faturas no total
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex justify-end lg:mt-0 lg:ml-4">
                  <span className="ml-3 hidden sm:block">
                    {/* Filtrar */}
                    <label className="align-center mx-auto md:mx-0">
                      <select
                        type="text"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.currentTarget.value)}
                        className="w-auto pl-4 pr-8 dark:bg-zinc-900 dark:hover:bg-zinc-800 transition duration-200 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 border-none ring-0 focus:ring-0 dark:text-gray-300"
                      >
                        <option
                          value=""
                          disabled
                          hidden
                          className="dark:bg-zinc-900"
                        >
                          Filtrar
                        </option>
                        <option value="" className="dark:bg-zinc-900">
                          Todos
                        </option>
                        <option value="Pago" className="dark:bg-zinc-900">
                          Pago
                        </option>
                        <option value="Pendente" className="dark:bg-zinc-900">
                          Pendente
                        </option>
                      </select>
                    </label>
                  </span>

                  <span className="sm:ml-3">
                    {/* Botao de cadastro de faturas */}
                    <button
                      type="button"
                      onClick={() => setOpen(true)}
                      className="w-auto justify-center rounded-md px-4 py-2.5 bg-indigo-900 transition duration-200 text-base font-medium text-white shadow-lg ring-1 ring-black ring-opacity-5 hover:bg-indigo-600 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Nova Fatura
                    </button>
                  </span>
                </div>
              </div>

              {/* Header Faturas
              <div className="w-4/5 md:w-2/3 flex flex-row justify-between mt-6 mx-auto">
                <div className="w-1/2 flex flex-col justify-start">
                  <h1 className="text-3xl text-zinc-900/90 dark:text-gray-300 font-medium">
                    Faturas
                  </h1>
                  <h2 className="dark:text-gray-400">
                    Há {length} faturas no total
                  </h2>
                </div> */}

              {/* <div className="w-1/2 flex flex-col-reverse md:flex-row justify-end mx-auto md:mx-0 my-auto">
                   Filtrar 
                  <label className="align-center mx-auto md:mx-0">
                    <select
                      type="text"
                      value={nameFilter}
                      onChange={(e) => setNameFilter(e.currentTarget.value)}
                      className="w-auto pl-4 pr-8 dark:bg-zinc-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 border-none ring-0 focus:ring-0 dark:text-gray-300"
                    >
                      <option
                        value=""
                        disabled
                        hidden
                        className="dark:bg-zinc-800"
                      >
                        Filtrar
                      </option>
                      <option value="" className="dark:bg-zinc-800">
                        Todos
                      </option>
                      <option value="Pago" className="dark:bg-zinc-800">
                        Pago
                      </option>
                      <option value="Pendente" className="dark:bg-zinc-800">
                        Pendente
                      </option>
                    </select>
                  </label>*/}

              {/* Botao de cadastro de faturas 
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="w-auto justify-center rounded-md px-4 py-2.5 bg-indigo-900 text-base font-medium text-white shadow-lg ring-1 ring-black ring-opacity-5 hover:bg-indigo-600 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Nova Fatura
                  </button>
                </div>
              </div>*/}

              <div className="w-2/3 flex justify-between mx-auto pt-2 px-10">
                <Transition.Root show={open} as={Fragment}>
                  <Dialog
                    as="div"
                    className="relative z-10"
                    initialFocus={cancelButtonRef}
                    onClose={setOpen}
                  >
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed z-10 inset-0 overflow-y-auto">
                      <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                          enterTo="opacity-100 translate-y-0 sm:scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                          <Dialog.Panel className="relative bg-white lg:w-auto rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:w-5/6">
                            <div className="bg-white dark:bg-zinc-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                              <div className="sm:flex sm:justify-left lg:justify-center">
                                <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                                  <Dialog.Title
                                    as="h3"
                                    className="text-lg leading-6 font-medium text-gray-900"
                                  >
                                    <p className="dark:text-gray-300">
                                      Nova fatura
                                      <span className="purple-txt">
                                        {" "}
                                        #FDEG77
                                      </span>
                                    </p>
                                  </Dialog.Title>
                                  <div className="mt-2">
                                    <form>
                                      <div class="relative z-0 mb-6 w-full group">
                                        <input
                                          type="text"
                                          name="floating_first_name"
                                          id="floating_first_name"
                                          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                          placeholder=" "
                                          required=""
                                        />
                                        <label
                                          for="floating_first_name"
                                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                          Nome do cliente
                                        </label>
                                      </div>
                                      <div class="relative z-0 mb-6 w-full group">
                                        <input
                                          type="email"
                                          name="floating_email"
                                          id="floating_email"
                                          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                          placeholder=" "
                                          required=""
                                        />
                                        <label
                                          for="floating_email"
                                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                          Email
                                        </label>
                                      </div>
                                      <div class="relative z-0 mb-6 w-full group">
                                        <input
                                          type="text"
                                          name="repeat_password"
                                          id="floating_repeat_password"
                                          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                          placeholder=" "
                                          required=""
                                        />
                                        <label
                                          for="floating_repeat_password"
                                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                          Endereço
                                        </label>
                                      </div>
                                      <div class="grid md:grid-cols-2 md:gap-6">
                                        <div class="relative z-0 mb-6 w-full group">
                                          <input
                                            type="text"
                                            name="floating_first_name"
                                            id="floating_first_name"
                                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=" "
                                            required=""
                                          />
                                          <label
                                            for="floating_first_name"
                                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                          >
                                            Cidade
                                          </label>
                                        </div>
                                        <div class="relative z-0 mb-6 w-full group">
                                          <input
                                            type="text"
                                            name="floating_last_name"
                                            id="floating_last_name"
                                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=" "
                                            required=""
                                          />
                                          <label
                                            for="floating_last_name"
                                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                          >
                                            Estado
                                          </label>
                                        </div>
                                      </div>
                                      <div class="grid md:grid-cols-2 md:gap-6">
                                        <div class="relative z-0 mb-6 w-full group">
                                          <input
                                            type="tel"
                                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                            name="floating_phone"
                                            id="floating_phone"
                                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=" "
                                            required=""
                                          />
                                          <label
                                            for="floating_phone"
                                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                          >
                                            Valor (R$)
                                          </label>
                                        </div>
                                        <div class="relative z-0 mb-6 w-full group">
                                          <input
                                            type="text"
                                            name="floating_company"
                                            id="floating_company"
                                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=" "
                                            required=""
                                          />
                                          <label
                                            for="floating_company"
                                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                          >
                                            Serviço
                                          </label>
                                        </div>
                                      </div>
                                      <div class="grid md:grid-cols-2 md:gap-6">
                                        <div class="relative z-0 mb-6 w-full group">
                                          <input
                                            type="date"
                                            name="floating_phone"
                                            id="floating_phone"
                                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=" "
                                            required=""
                                          />
                                          <label
                                            for="floating_phone"
                                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                          >
                                            Vencimento
                                          </label>
                                        </div>
                                        <div class="relative z-0 mb-6 w-full group">
                                          <select
                                            type="text"
                                            name="floating_company"
                                            id="floating_company"
                                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                          >
                                            <option>10 dias</option>
                                            <option>15 dias</option>
                                            <option>20 dias</option>
                                          </select>
                                          <label
                                            for="floating_company"
                                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                          >
                                            Termos de pagamento
                                          </label>
                                        </div>
                                      </div>
                                      <div className="bg-transparent px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button
                                          type="button"
                                          className="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-indigo-900 text-base font-medium text-white hover:bg-indigo-600 sm:ml-3 sm:w-auto sm:text-sm"
                                          onClick={() => setOpen(false)}
                                        >
                                          Confirmar
                                        </button>
                                        <button
                                          type="button"
                                          className="mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-gray-100 text-base font-medium text-gray-700 hover:bg-gray-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                          onClick={() => setOpen(false)}
                                          ref={cancelButtonRef}
                                        >
                                          Cancelar
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition.Root>
              </div>
            </div>

            <table className="w-full lg:w-2/3 mx-auto">
              <tbody className="mx-auto">
                {data
                  .filter(({ birthdate, status, name }) =>
                    selectMonthFilter || nameFilter
                      ? getMonthValue(birthdate) === selectMonthFilter ||
                        status
                          .concat(name)
                          .toLowerCase()
                          .includes(nameFilter.toLowerCase())
                      : true
                  )
                  .map((el) => (
                    <>
                      <div class="flex justify-between bg-gray-100 items-center px-10 py-4 text-gray-300 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-zinc-900 dark:border-gray-700 mt-4">
                        <td
                          scope="row"
                          className="py-4 px-6 font-medium text-white whitespace-nowrap dark:text-white w-1/4"
                        >
                          <span className="text-zinc-900/90 dark:text-gray-300 font-medium flex">
                            <p className="purple-txt">#</p>
                            {el.code}
                          </span>
                        </td>
                        <td className="px-6 w-1/4 text-zinc-900/90 dark:text-gray-300 font-medium">
                          {el.due}
                        </td>
                        <td className="py-4 px-6 w-1/4">
                          <span className="text-zinc-900/90 dark:text-gray-300 font-medium">
                            {el.name}
                          </span>
                        </td>
                        <td className="py-4 px-6 flex w-1/4 justify-center">
                          <div
                            className={clsx(
                              el.paid
                                ? "w-2 h-2 bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium mr-2 mt-2"
                                : "w-2 h-2 bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium mr-2 mt-2",
                              "",
                              " rounded-full"
                            )}
                          ></div>
                          <p className="text-zinc-900/90 dark:text-gray-300 font-medium justify-center">
                            {el.status}
                          </p>
                        </td>
                        <td className="">
                          <Icon
                            path="res-react-dash-options"
                            className="block sm:hidden xl:block w-3 h-3"
                          />
                        </td>
                      </div>
                    </>
                  ))}
              </tbody>
            </table>
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

ReactDOM.render(<Invoices />, document.getElementById("root"));
