import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";
import { getEvents, postEvent } from "../../services/EventServices";

export const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", start: "" });

  // Fetch events from the database when the component mounts
  useEffect(() => {
    fetchEventsFromDatabase();
  }, []);

  // Fetch events function
  const fetchEventsFromDatabase = () => {
    getEvents()
      .then((fetchedEvents) => {
        console.log("Fetched events:", fetchedEvents); // Debugging
        setEvents(fetchedEvents); // Set the fetched events into the state
      })
      .catch((error) => {
        console.error("Error fetching events: ", error);
      });
  };

  const handleDateClick = (info) => {
    setModalVisible(true);
    setNewEvent({ ...newEvent, start: info.dateStr });
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSubmitEvent = () => {
    setEvents([...events, newEvent]); // Optimistically add the new event to the state
    setModalVisible(false);
    postEvent(newEvent)
      .then((createdEvent) => {
        console.log("Event posted successfully:", createdEvent); // Debugging
        // Re-fetch the events from the database to ensure it's properly saved
        fetchEventsFromDatabase();
      })
      .catch((error) => {
        console.error("Error posting event:", error);
      });
  };

  return (
    <div className="calendar-parent">
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          editable={true}
          selectable={true}
          events={events} // Event data fetched from the database
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek",
          }}
          dateClick={handleDateClick}
        />
      </div>

      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Schedule Event</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitEvent();
              }}
            >
              <label>
                Event Title:
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  required
                />
              </label>
              <br />
              <label>
                Date: <strong>{newEvent.start}</strong>
              </label>
              <br />
              <button type="submit">Add Event</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
