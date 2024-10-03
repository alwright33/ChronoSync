import { useEffect, useState } from "react";
import { getEvents } from "../../services/EventServices";

export const GroupMembersSchedule = () => {
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    getEvents().then((events) => {
      const usersEvents = events.find(
        (event) => event.userId === currentUser.id
      );
      setUserEvents(usersEvents);
    });
  }, []);

  return (
    <section className="user-container">
      <div className="user">
        <h1>{currentUser.fullName}</h1>
        <ul>
          {userEvents.map((event) => {
            <li className="">
              <span>&times;</span>
              <h2>Event Details</h2>
              <p>
                <strong>Title:</strong> {event.title}
              </p>
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
            </li>;
          })}
        </ul>
      </div>
    </section>
  );
};
