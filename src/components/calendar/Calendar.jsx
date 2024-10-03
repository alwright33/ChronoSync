import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";
import { getEvents, postEvent } from "../../services/EventServices";
import { getCategories } from "../../services/categoryServices";
import { EventCreationModal } from "./EventCreationModal";
import { EventDetailsModal } from "./EventDetailsModal";

export const CalendarComponent = ({ currentUser }) => {
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
    userId: currentUser.id,
    recurring: false,
    frequency: "daily",
    createdAt: "",
  });
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchAndRenderEvents();
    fetchAndRenderCategories();
  }, []);

  const fetchAndRenderEvents = () => {
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
          userId: event.userId,
          time: event.time,
        },
      }));

      setEvents(formattedEvents);
    });
  };

  const fetchAndRenderCategories = () => {
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
      description:
        clickInfo.event.extendedProps?.description || "No description provided",
      userId: clickInfo.event.extendedProps?.userId || "N/A",
      recurring: clickInfo.event.extendedProps?.recurring ? "Yes" : "No",
      frequency: clickInfo.event.extendedProps?.frequency || "N/A",
      createdAt: clickInfo.event.extendedProps?.createdAt || "N/A",
      time: clickInfo.event.extendedProps?.time || "N/A",
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
      fetchAndRenderEvents();
    });
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
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
        <EventCreationModal
          newEvent={newEvent}
          categories={categories}
          handleInputChange={handleInputChange}
          handleSubmitEvent={handleSubmitEvent}
          handleCloseModal={handleCloseModal}
        />
      )}

      {eventDetailsModalVisible && selectedEvent && (
        <EventDetailsModal
          selectedEvent={selectedEvent}
          handleCloseEventDetailsModal={handleCloseEventDetailsModal}
        />
      )}
    </div>
  );
};
