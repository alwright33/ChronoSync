import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventsByUserId } from "../../services/EventServices";
import { getUserById } from "../../services/userServices";
import "./Events.css";

export const UserEvents = () => {
  const { userId } = useParams();
  const [userEvents, setUserEvents] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getEventsByUserId(userId).then((events) => setUserEvents(events));

    getUserById(userId).then((userData) => setUser(userData));
  }, [userId]);

  return (
    <div className="user-events-container">
      {user ? (
        <h1>Events for {user.firstName}</h1>
      ) : (
        <h1>User not available</h1>
      )}

      {userEvents.length > 0 ? (
        <ul className="user-events-list">
          {userEvents.map((event) => (
            <li key={event.id} className="event-card">
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
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-events">No events for this user.</p>
      )}
    </div>
  );
};
