import React, { useState } from "react";
import useDarkSide from "./useDarkSide";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { Button, Tooltip } from "@material-tailwind/react";

export default function Switcher() {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <>
      <div className="flex items-center bottom-0">
        <Tooltip
          content={colorTheme === "light" ? "Dark Mode" : "Light Mode"}
          className="-mt-2 bg-sky-600"
        >
          <Button className="shadow-inherit">
            <DarkModeSwitch
              checked={darkSide}
              onChange={toggleDarkMode}
              size={25}
            />
          </Button>
        </Tooltip>
      </div>
    </>
  );
}
