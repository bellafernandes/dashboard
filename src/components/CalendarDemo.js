import React from "react";
import FullCalendar from "@fullcalendar/react";
import classnames from "classnames";
// import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";




import "../components/styles.css";
import { Calendar } from "react-calendar";



const slotMinutes = ["15", "30", "60"];

const dateFormat = {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  meridiem: false
};

const resources = [
  { id: "a", title: "Room A" },
  { id: "b", title: "Room B" },
  { id: "c", title: "Room C" },
  { id: "d", title: "Room D" },
  { id: "e", title: "Room E" },
  { id: "f", title: "Room F" },
  { id: "g", title: "Room G" },
  { id: "h", title: "Room H" },
  { id: "i", title: "Room I" },
  { id: "j", title: "Room J" },
  { id: "k", title: "Room K" },
  { id: "l", title: "Room L" },
  { id: "m", title: "Room M" },
  { id: "n", title: "Room N" },
  { id: "o", title: "Room O" }
  // { id: "p", title: "Room P" }
];

function getCurrentDate() {
  let today = new Date();

  let month = today.getMonth() + 1;

  return (
    today.getFullYear() +
    "-" +
    (month < 10 ? "0" : "") +
    month +
    "-" +
    today.getDate()
  );
}



export default class CalendarDemo extends React.Component {
  constructor(props) {
    super(props);

    

    let currentDate = getCurrentDate();

    this.state = {
      resourcesStartIndex: 0,
      resourcesEndIndex: 0,
      resourcesToShow: 0,
      slotIndex: 0,
      events: [
        {
          title: "Something A",
          start: `2022-08-26 08:00:00`,
          end: `2022-08-29 09:00:00`,
          resourceId: "a",
          overlap: false
        },
        {
          title: "Something B",
          start: `${currentDate} 10:00:00`,
          end: `${currentDate} 10:45:00`,
          resourceId: "a",
          overlap: false
        },
        {
          title: "Something C",
          start: `${currentDate} 09:00:00`,
          end: `${currentDate} 12:00:00`,
          resourceId: "b",
          overlap: false
        },
        {
          title: "Something D",
          start: `${currentDate} 12:00:00`,
          end: `${currentDate} 14:00:00`,
          resourceId: "c",
          overlap: false
        },
        {
          title: "Something A",
          start: `${currentDate} 08:00:00`,
          end: `${currentDate} 09:00:00`,
          resourceId: "c",
          overlap: false
        },
        {
          title: "Something B",
          start: `${currentDate} 10:00:00`,
          end: `${currentDate} 10:45:00`,
          resourceId: "d",
          overlap: false
        },
        {
          title: "Something C",
          start: `${currentDate} 09:00:00`,
          end: `${currentDate} 12:00:00`,
          resourceId: "e",
          overlap: false
        },
        {
          title: "Something D",
          start: `${currentDate} 12:00:00`,
          end: `${currentDate} 14:00:00`,
          resourceId: "f",
          overlap: false
        }
      ]
    };

    this.updateResourcesToShow = this.updateResourcesToShow.bind(this);
  }

  componentDidMount() {
    this.updateResourcesToShow();
    window.addEventListener("resize", this.updateResourcesToShow);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateResourcesToShow);
  }

  updateResourcesToShow() {
    let resourcesToShow = this.calculateResourcesToShow(window.innerWidth);
    this.setState({
      resourcesToShow,
      resourcesEndIndex: resourcesToShow
    });
  }

  calculateResourcesToShow = windowInnerWidth => {
    if (windowInnerWidth > 1280) {
      return 6;
    } else if (windowInnerWidth > 1080) {
      return 4;
    } else if (windowInnerWidth > 720) {
      return 3;
    } else if (windowInnerWidth > 540) {
      return 2;
    } else {
      return 2;
    }
  };

  handleZoomIn = () => {
    this.setState(state => {
      return {
        slotIndex: state.slotIndex--
      };
    });
  };

  handleZoomOut = () => {
    this.setState(state => {
      return {
        slotIndex: state.slotIndex++
      };
    });
  };

  handleSlideLeft = () => {
    this.setState(state => {
      let calculatedResourcesStartIndex =
        state.resourcesStartIndex - state.resourcesToShow;
      let resourcesStartIndex =
        calculatedResourcesStartIndex < 0 ? 0 : calculatedResourcesStartIndex;

      let calculatedResourcesEndIndex =
        state.resourcesEndIndex - state.resourcesToShow;

      let resourcesEndIndex =
        calculatedResourcesEndIndex > resources.length
          ? resources.length + 1
          : calculatedResourcesEndIndex;

      return {
        resourcesStartIndex,
        resourcesEndIndex
      };
    });
  };

  handleSlideRight = () => {
    this.setState(state => {
      let calculatedResourcesEndIndex =
        state.resourcesEndIndex + state.resourcesToShow;

      let resourcesEndIndex =
        calculatedResourcesEndIndex > resources.length
          ? resources.length + 1
          : calculatedResourcesEndIndex;

      let calculatedResourcesStartIndex =
        state.resourcesStartIndex + state.resourcesToShow;
      let resourcesStartIndex =
        calculatedResourcesStartIndex > resources.length
          ? resources.length - state.resourcesToShow
          : resources.length - calculatedResourcesStartIndex <
            state.resourcesToShow
          ? resources.length - state.resourcesToShow
          : calculatedResourcesStartIndex;

      return {
        resourcesStartIndex,
        resourcesEndIndex
      };
    });
  };

  handleResourcesDisplay = () => {
    // if ()
    //resources.slice(this.state.resourcesStartIndex, this.state.resourcesToShow);

    // console.log("resourcesStartIndex render", this.state.resourcesStartIndex);
    // console.log("resourcesEndIndex render", this.state.resourcesEndIndex);
    // console.log("resourcesToShow render", this.state.resourcesToShow);
    // console.log("resources length", resources.length);

    let resourcesToDisplay = resources.slice(
      this.state.resourcesStartIndex,
      this.state.resourcesEndIndex
    );

    return resourcesToDisplay;
  };

  render() {
    return (
      <>
        <div className="Actions__wrapper">
          {/* ACTIONS ZOOM */}
          {/* <div className="Action__zoom">
            <button
              onClick={this.handleZoomIn}
              disabled={this.state.slotIndex === 0}
            >
              Zoom in
            </button>
            <button
              onClick={this.handleZoomOut}
              disabled={this.state.slotIndex === slotMinutes.length - 1}
            >
              Zoom out
            </button>
          </div> */}

          {/* ACTIONS SLIDE */}
          {/* <div className="Action__slide">
            <button
              onClick={this.handleSlideLeft}
              disabled={this.state.resourcesStartIndex === 0}
            >
              Slide left
            </button>
            <button
              onClick={this.handleSlideRight}
              disabled={this.state.resourcesEndIndex === resources.length}
            >
              Slide right
            </button>
          </div> */}


          {/* <button className=""><Icon path="res-react-dash-plus" className="w-5 h-5" /></button> */}
        </div>

        {/* CALENDAR */}
        {this.state.resourcesToShow !== 0 && (
          <div
            className={classnames(
              "booking_calendar text-zinc-900/90 dark:text-gray-200",
              `zoom-${this.state.slotIndex}`
            )}
          >
            <FullCalendar
              defaultView="resourceTimeGridDay"
              aspectRatio={1.5}
              // businessHours={true}
              weekends={false}
              editable={true}
              allDaySlot={false}
              slotMinTime={`08:00:00`}
              slotMaxTime={`19:00:00`}
              plugins={[resourceTimeGridPlugin, interactionPlugin]}
              slotEventOverlap={false}
              slotDuration={`01:00:00`}
              slotLabelInterval={`00:${slotMinutes[this.state.slotIndex]}:00`}
              minTime="08:00:00"
              maxTime="18:00:00"
              resources={this.handleResourcesDisplay()}
              events={this.state.events}
              height={`auto`}
              eventTimeFormat={dateFormat}
              slotLabelFormat={dateFormat}
              // locale="pt-br"
            />
          </div>
        )}
      </>
    );
  }
}
