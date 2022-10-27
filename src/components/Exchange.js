import React, { Fragment, useState, Component } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  SelectorIcon,
  ArrowRightIcon,
} from "@heroicons/react/solid";

/* CoinMarket API */
const axios = require("axios");

let response = null;
new Promise(async (resolve, reject) => {
  try {
    response = await axios.get(
      "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": "9903b459-5ea0-4592-8526-bb3ed3dee67b",
        },
      }
    );
  } catch (ex) {
    response = null;
    // error
    console.log(ex);
    reject(ex);
  }
  if (response) {
    // success
    const json = response.data;
    console.log(json);
    resolve(json);
  }
});

const coins = [
  { name: "BTC" },
  { name: "ETH" },
  { name: "BRL" },
  { name: "USD" },
];

const coins2 = [
  { name: "BTC" },
  { name: "ETH" },
  { name: "BRL" },
  { name: "USD" },
];


export default function Exchange() {
  const [selected, setSelected] = useState(coins[0]);

  return (
    <>
      <div className="w-full mt-10">
        <span className="flex justify-center items-center w-full text-white">
          1 BTC <ArrowRightIcon className="h-5 w-5 mx-2 text-blue-500" />{" "}
          2.547,00 USD
        </span>
      </div>
      <div className="mt-10"></div>

      <form>
        <div className="list-box-1">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 pl-20 pr-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-full-name"
            type="text"
          />

          <Listbox value={selected} onChange={setSelected}>
            <div className="relative -mt-10 w-10">
              <Listbox.Button className="relative cursor-default rounded-lg py-2 pl-3 pr-10 bg-transparent text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">{selected.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <SelectorIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-max overflow-auto rounded-md py-1 text-base bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {coins.map((person, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-amber-100 text-amber-900"
                            : "text-gray-900"
                        }`
                      }
                      value={person}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {person.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        <div className="list-box-2 mt-4">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 pl-20 pr-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-full-name"
            type="text"
          />

          <Listbox value={selected} onChange={setSelected}>
            <div className="relative -mt-10 w-10">
              <Listbox.Button className="relative cursor-default rounded-lg py-2 pl-3 pr-10 bg-transparent text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">{selected.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <SelectorIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-max overflow-auto rounded-md py-1 text-base bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {coins2.map((person, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-amber-100 text-amber-900"
                            : "text-gray-900"
                        }`
                      }
                      value={person}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {person.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-center">
          <div className="rounded-md shadow">
            <a
              href="#"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              Get started
            </a>
          </div>
        </div>
      </form>
    </>
  );
}
