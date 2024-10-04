export const getEvents = () => {
  return fetch(`http://localhost:8088/events?_expand=user`).then((response) =>
    response.json()
  );
};

export const getEventById = (eventId) => {
  return fetch(`http://localhost:8088/events/${eventId}`).then((response) =>
    response.json()
  );
};

export const postEvent = (newEvent) => {
  return fetch(`http://localhost:8088/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newEvent),
  }).then((response) => response.json());
};

export const getGroupEvents = (groupId) => {
  return fetch(
    `http://localhost:8088/groupEvents?groupId=${groupId}&_expand=event`
  )
    .then((response) => response.json())
    .then((groupEvents) => groupEvents.map((event) => event.event));
};

export const deleteEventById = (eventId) => {
  return fetch(`http://localhost:8088/events/${eventId}`, {
    method: "DELETE",
  }).then((response) => response.json());
};

export const updateEventById = (eventId, updatedEvent) => {
  return fetch(`http://localhost:8088/events/${eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedEvent),
  })
    .then((response) => {
      return response.json();
    })
    .then((updatedData) => {
      return updatedData;
    });
};

export const getEventsByUserId = (userId) => {
  return fetch(
    `http://localhost:8088/events?_expand=user&userId=${userId}`
  ).then((response) => response.json());
};
