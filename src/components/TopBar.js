import React, { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { BellIcon } from "@heroicons/react/outline";
import Switcher from "./Switcher";
import "../pages/styles.css";

const notificationActivitiesData = [
  {
    id: "1",
    name: "teste 1",
    description: "descricao 1",
  },
  {
    id: "2",
    name: "Hello",
    description: "descricao 2",
  },
];

const notificationMyAccData = [
  {
    id: "1",
    name: "Admin",
    description: "Please verify your email",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TopBar() {
  const [openTab, setOpenTab] = React.useState(1);

  const [isShow, setIsShow] = React.useState(true);

  const handleClick = () => {
    setIsShow(!isShow);
  };

  const [read, setRead] = useState(false);

  



  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <TopBarSkeleton />;
  } else {
    return (
      <Disclosure as="nav" className="bg-zinc-300/90 dark:bg-zinc-900/95">
        <>
          <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-end">
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Switcher />

                {/* Notifications button */}

                <Menu as="div" className="relative mr-3">
                  <div>
                    <Menu.Button className="flex rounded-full text-sm focus:outline-none">
                      <span className="sr-only">Open notifications menu</span>

                      {read === false ? (
                        <div class="inline-flex absolute justify-center items-center w-2 h-2 ml-1 text-xs font-bold text-white bg-red-500 rounded-full" />
                      ) : (
                        <></>
                      )}

                      <span className="sr-only">See notifications</span>
                      <BellIcon
                        className="h-6 w-6 -ml-4 text-zinc-900/90 hover:text-zinc-700/90 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none transition duration-200"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute mt-2 w-96 right-0 origin-top-right rounded-md bg-white px-4 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <div className="mt-4">
                        <p className="text-center text-lg text-zinc-900/90 font-medium">
                          Notifications
                        </p>

                        {/* Tabs */}

                        <div className="flex flex-wrap">
                          <div className="w-full">
                            {/* Header Tab */}
                            <ul
                              className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                              role="tablist"
                            >
                              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                <a
                                  className={
                                    "font-[450] px-5 py-3 block leading-normal transition duration-200" +
                                    (openTab === 1
                                      ? "text-zinc-900/90 border-b-2 border-sky-600"
                                      : "text-sky-600 bg-white")
                                  }
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setOpenTab(1);
                                  }}
                                  data-toggle="tab"
                                  href="#link1"
                                  role="tablist"
                                >
                                  Activities
                                </a>
                              </li>
                              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                <a
                                  className={
                                    "font-[450] px-5 py-3 block leading-normal transition duration-200 flex" +
                                    (openTab === 2
                                      ? "text-zinc-900/90 border-b-2 border-sky-600"
                                      : "text-sky-600 bg-white")
                                  }
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setOpenTab(2);
                                    setRead(true);
                                  }}
                                  data-toggle="tab"
                                  href="#link2"
                                  role="tablist"
                                >
                                  <span>My account</span>
                                  {read === false ? (
                                    <div className="w-6 h-6 rounded-full bg-red-500 p-2 float-right text-zinc-300/90 grid content-center">
                                      <p className="text-sm">1</p>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                </a>
                              </li>
                            </ul>
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full rounded">
                              <div className="px-4 py-5 flex-auto">
                                <div className="tab-content tab-space">
                                  {/* Activities Tab */}
                                  <div
                                    className={
                                      openTab === 1 ? "block" : "hidden"
                                    }
                                    id="link1"
                                  >
                                    {notificationActivitiesData.map(
                                      ({ name, description }) => (
                                        <>
                                          {isShow ? (
                                            <div className="flex flex-col-2 mb-10 -mt-4">
                                              <div className="bg-sky-500 text-zinc-300 rounded-full h-10 w-10 mr-2 mt-2 text-center grid content-center">
                                                {/* Get the first character */}
                                                <p className="">
                                                  {name.charAt(0)}
                                                </p>
                                              </div>
                                              <div className="mt-1">
                                                <h1 className="text-zinc-900 font-medium">
                                                  {name}
                                                </h1>
                                                <p className="text-zinc-800/90 text-sm">
                                                  {description}
                                                </p>
                                              </div>
                                            </div>
                                          ) : (
                                            <></>
                                          )}
                                        </>
                                      )
                                    )}
                                    {isShow ? (
                                      <div className="flex justify-between">
                                        <div />
                                        <button
                                          onClick={handleClick}
                                          className="rounded-lg bg-sky-500 hover:bg-sky-400 p-2 text-zinc-300 transition duration-200"
                                        >
                                          Clear all
                                        </button>
                                      </div>
                                    ) : (
                                      <h1 className="text-center -mt-2">
                                        No notifications
                                      </h1>
                                    )}
                                  </div>

                                  {/* My account tab */}
                                  <div
                                    className={
                                      openTab === 2 ? "block" : "hidden"
                                    }
                                    id="link2"
                                  >
                                    {notificationMyAccData.map(
                                      ({ name, description }) => (
                                        <>
                                          {isShow ? (
                                            <div className="flex flex-col-2 mb-10 -mt-4">
                                              <div className="bg-sky-500 text-zinc-300 rounded-full h-10 w-10 mr-2 mt-2 text-center grid content-center">
                                                {/* Get the first character */}
                                                <p className="">
                                                  {name.charAt(0)}
                                                </p>
                                              </div>
                                              <div className="mt-1">
                                                <h1 className="text-zinc-900 font-medium">
                                                  {name}
                                                </h1>
                                                <p className="text-zinc-800/90 text-sm">
                                                  {description}
                                                </p>
                                              </div>
                                            </div>
                                          ) : (
                                            <></>
                                          )}
                                        </>
                                      )
                                    )}
                                    {isShow ? (
                                      <div className="flex justify-between">
                                        <div />
                                        <button
                                          onClick={handleClick}
                                          className="rounded-lg bg-sky-400 hover:bg-sky-800 p-2 text-zinc-300 transition duration-200"
                                        >
                                          Clear all
                                        </button>
                                      </div>
                                    ) : (
                                      <h1 className="text-center -mt-2">
                                        No notifications
                                      </h1>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* Divider */}
                <div className="w-0.5 h-7 bg-gray-600/40 dark:bg-gray-400/30" />

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full text-sm focus:outline-none">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                      <p className="text-gray-900/90 hover:text-gray-500/90 dark:text-gray-400 dark:hover:text-gray-200 ml-2 mt-1 transition duration-200 flex hidden sm:inline-flex">
                        John Doe
                        <ChevronDownIcon
                          className="w-6 h-6 -mt-0.5"
                          aria-hidden="true"
                        />
                      </p>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 hover:text-gray-500/90 transition duration-200"
                            )}
                          >
                            Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 hover:text-gray-500/90 transition duration-200"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 hover:text-gray-500/90 transition duration-200"
                            )}
                          >
                            Logout
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          {/* <Disclosure.Panel className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => (
              <Disclosure.Button
                key={item.name}
                as="a"
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block px-3 py-2 rounded-md text-base font-medium"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </Disclosure.Button>
            ))}
          </div>
        </Disclosure.Panel> */}
        </>
      </Disclosure>
    );
  }
}

function TopBarSkeleton() {
  return (
    <div className="bg-zinc-300/90 dark:bg-zinc-900/95">
      <>
        <div className="hidden">
          <Switcher />
        </div>
        <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-end">
            <div className="container h-7 w-7 rounded-lg -ml-4 mr-6" />

            <div className="relative mr-3">
              <div className="container h-7 w-7 rounded-lg -ml-4" />
            </div>

            <div className="w-0.5 h-7 bg-gray-600/40 dark:bg-gray-400/30" />

            <div className="relative ml-3 flex">
              <div className="h-8 w-8 rounded-full container" />
              <div className="w-20 h-5 rounded-lg ml-2 my-auto container" />
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
