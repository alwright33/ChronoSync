import { useEffect, useState } from "react";
import { getEvents } from "../../services/EventServices";
import "./Schedules.css";

export const MySchedule = ({ currentUser }) => {
  const [mySchedule, setMySchedule] = useState([]);

  useEffect(() => {
    getEvents().then((events) => {
      const myEvents = events.filter(
        (event) => event.userId === currentUser.id
      );
      setMySchedule(myEvents);
    });
  }, [currentUser.id]);

  return (
    <div className="schedule-container">
      <header className="schedule-header">
        <h1>My Scheduled Events:</h1>
      </header>
      {mySchedule.length > 0 ? (
        <ul className="schedule-list">
          {mySchedule.map((event) => {
            return (
              <li key={event.id}>
                <div className="event-item">
                  <h2>{event.title}</h2>
                  <p>
                    <strong>Description:</strong> {event.description || "N/A"}
                  </p>
                  <p>
                    <strong>User:</strong> {event.user.firstName}{" "}
                    {event.user.lastName}
                  </p>
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
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="no-events">No events to display.</p>
      )}
    </div>
  );
};
