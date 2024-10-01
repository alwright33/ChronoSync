import React, { useRef, useEffect } from "react";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css"; // Assuming you have your styles here

export const CalendarComponent = () => {
  const calendarRef = useRef(null);

  useEffect(() => {
    const calendar = new Calendar(calendarRef.current, {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: "dayGridMonth",
      editable: true,
      selectable: true,
      headerToolbar: {
        left: "prev,next today", // Align navigation buttons to the left
        center: "title", // Keep the month/year title in the center
        right: "dayGridMonth,dayGridWeek", // Align view buttons to the right
      },
      events: [
        { title: "Event 1", start: "2024-10-01" },
        { title: "Event 2", start: "2024-10-05" },
      ],
      datesSet: function (info) {
        const groupName = "Group Name"; // Set your actual group name here
        const titleElement = document.querySelector(".fc-toolbar-title");

        if (titleElement) {
          // Reset the title to the default month/year
          titleElement.innerText = info.view.title + ` - ${groupName}`; // Add group name after title
        }
      },
      dateClick: function (info) {
        alert(`Clicked on date: ${info.dateStr}`);
      },
    });

    calendar.render();

    return () => {
      calendar.destroy();
    };
  }, []);

  return (
    <div className="calendar-parent">
      <div className="calendar-container">
        <div ref={calendarRef} id="calendar"></div>
      </div>
    </div>
  );
};
