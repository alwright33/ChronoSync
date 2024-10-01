import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";
import { getEvents, postEvent } from "../../services/EventServices";

export const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    time: "",
    recurring: false,
    frequency: "daily",
  });

  useEffect(() => {
    fetchEventsFromDatabase();
  }, []);

  const fetchEventsFromDatabase = () => {
    getEvents().then((fetchedEvents) => {
      setEvents(fetchedEvents);
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
    const eventToSubmit = {
      ...newEvent,
      createdAt: new Date().toISOString(),
    };

    setEvents([...events, eventToSubmit]);
    setModalVisible(false);
    postEvent(eventToSubmit).then(() => {
      fetchEventsFromDatabase();
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="calendar-parent">
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          editable={true}
          selectable={true}
          events={events}
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
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br />
              <label>
                Start Date:
                <input
                  type="date"
                  name="start"
                  value={newEvent.start}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br />
              <label>
                End Date:
                <input
                  type="date"
                  name="end"
                  value={newEvent.end}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                Start Time:
                <input
                  type="time"
                  name="time"
                  value={newEvent.time}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="recurring"
                  checked={newEvent.recurring}
                  onChange={handleInputChange}
                />
                Recurring Event
              </label>
              {newEvent.recurring && (
                <>
                  <label>
                    Frequency:
                    <select
                      name="frequency"
                      value={newEvent.frequency}
                      onChange={handleInputChange}
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </label>
                </>
              )}
              <br />
              <button type="submit">Add Event</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
