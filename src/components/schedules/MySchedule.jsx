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
            </li>
          ))}
        </ul>
      ) : (
        <p>No events to display.</p>
      )}
    </div>
  );
};
