import { useEffect, useState } from "react";
import { getEvents, deleteEventById } from "../../services/EventServices";
import { useNavigate } from "react-router-dom";
import "./Schedules.css";

export const MySchedule = ({ currentUser }) => {
  const [mySchedule, setMySchedule] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getEvents().then((events) => {
      const myEvents = events.filter(
        (event) => event.userId === currentUser.id
      );
      setMySchedule(myEvents);
    });
  }, [currentUser.id]);

  const deleteEvent = (eventId) => {
    deleteEventById(eventId).then(() => {
      setMySchedule((prevSchedule) =>
        prevSchedule.filter((event) => event.id !== eventId)
      );
    });
  };

  const updateEvent = (eventId) => {
    navigate(`/update-event/${eventId}`);
  };

  return (
    <div className="schedule-container">
      <header className="schedule-header">
        <h1>My Scheduled Events:</h1>
        <button
          onClick={() => navigate("/create-event")}
          className="create-event-button"
        >
          Create New Event
        </button>
      </header>

      {mySchedule.length > 0 ? (
        <ul className="schedule-list">
          {mySchedule.map((event) => (
            <li key={event.id}>
              <div className="event-item">
                <h2>{event.title}</h2>
                <p>{event.description}</p>
                <p>
                  <strong>Start Date:</strong> {event.start}
                </p>
                <p>
                  <strong>End Date:</strong> {event.end || "N/A"}
                </p>
                <p>
                  <strong>Time:</strong> {event.time || "N/A"}
                </p>
                <p>
                  <strong>Recurring:</strong> {event.recurring ? "Yes" : "No"}
                </p>
                {event.recurring && (
                  <p>
                    <strong>Frequency:</strong> {event.frequency}
                  </p>
                )}
                <p>
                  <strong>Created At:</strong> {event.createdAt}
                </p>
                <div className="button-container">
                  <button
                    onClick={() => updateEvent(event.id)}
                    className="update-button"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-events">No events to display.</p>
      )}
    </div>
  );
};
