import React, { useEffect, useState } from "react";
import { getUserGroups } from "../../services/groupServices";
import { getGroupEvents } from "../../services/EventServices";
import "./Calendar.css";

export const CalendarPage = ({ currentUser }) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getUserGroups(currentUser.id).then((userGroups) => {
      setGroups(userGroups);

      if (userGroups.length === 1) {
        const groupId = userGroups[0].id;
        setSelectedGroup(groupId);
        fetchEvents(groupId);
      }
    });
  }, [currentUser.id]);

  const fetchEvents = (groupId) => {
    if (!groupId) return;

    getGroupEvents(groupId).then((groupEvents) => {
      setEvents(groupEvents);
    });
  };

  const handleGroupSelect = (event) => {
    const groupId = event.target.value;
    setSelectedGroup(groupId);
    fetchEvents(groupId);
  };

  return (
    <div className="calendar-container">
      {groups.length > 1 && (
        <select
          className="group-select"
          value={selectedGroup || ""}
          onChange={handleGroupSelect}
        >
          <option value="">Select a group</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      )}

      {events.length > 0 ? (
        <div className="event-list">
          {events.map((event) => (
            <div className="event-item" key={event.id}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-events">No events to display.</p>
      )}
    </div>
  );
};
