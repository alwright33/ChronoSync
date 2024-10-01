import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";
import { getEvents, postEvent } from "../../services/EventServices";
import { getCategories } from "../../services/categoryServices";

export const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventDetailsModalVisible, setEventDetailsModalVisible] =
    useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    time: "",
    categoryId: "",
    recurring: false,
    frequency: "daily",
    createdAt: "",
  });
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEventsFromDatabase();
    fetchCategoriesFromDatabase();
  }, []);

  const fetchEventsFromDatabase = () => {
    getEvents().then((fetchedEvents) => {
      const formattedEvents = fetchedEvents.map((event) => ({
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        extendedProps: {
          description: event.description,
          user: event.user,
          recurring: event.recurring,
          frequency: event.frequency,
          createdAt: event.createdAt,
          categoryId: event.categoryId,
          time: event.time,
        },
      }));

      setEvents(formattedEvents);
    });
  };

  const fetchCategoriesFromDatabase = () => {
    getCategories().then((fetchedCategories) => {
      setCategories(fetchedCategories);
    });
  };

  const handleDateClick = (info) => {
    setModalVisible(true);
    setNewEvent({ ...newEvent, start: info.dateStr });
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleEventClick = (clickInfo) => {
    const clickedEvent = {
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.startStr,
      end: clickInfo.event.endStr || "N/A",
      description: clickInfo.event.extendedProps.description || "N/A",
      user: clickInfo.event.extendedProps.user || {},
      recurring: clickInfo.event.extendedProps.recurring,
      frequency: clickInfo.event.extendedProps.frequency || "N/A",
      createdAt: clickInfo.event.extendedProps.createdAt || "N/A",
      time: clickInfo.event.extendedProps.time || "N/A",
    };

    setSelectedEvent(clickedEvent);
    setEventDetailsModalVisible(true);
  };

  const handleCloseEventDetailsModal = () => {
    setEventDetailsModalVisible(false);
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
          eventClick={handleEventClick}
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
              <label>
                Category:
                <select
                  name="categoryId"
                  value={newEvent.categoryId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
              <br />
              <button type="submit">Add Event</button>
            </form>
          </div>
        </div>
      )}
      {eventDetailsModalVisible && selectedEvent && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseEventDetailsModal}>
              &times;
            </span>
            <h2>Event Details</h2>
            <p>
              <strong>Title:</strong> {selectedEvent.title}
            </p>
            <p>
              <strong>Description:</strong> {selectedEvent.description || "N/A"}
            </p>
            <p>
              <strong>User:</strong> {selectedEvent.user.firstName}{" "}
              {selectedEvent.user.lastName}
            </p>
            <p>
              <strong>Start Date:</strong> {selectedEvent.start}
            </p>
            <p>
              <strong>End Date:</strong> {selectedEvent.end || "N/A"}
            </p>
            <p>
              <strong>Time:</strong> {selectedEvent.time || "N/A"}
            </p>
            <p>
              <strong>Recurring:</strong>{" "}
              {selectedEvent.recurring ? "Yes" : "No"}
            </p>
            {selectedEvent.recurring && (
              <p>
                <strong>Frequency:</strong> {selectedEvent.frequency}
              </p>
            )}
            <p>
              <strong>Created At:</strong> {selectedEvent.createdAt}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
