export const getEvents = () => {
  return fetch(`http://localhost:8088/events?_expand=user`).then((response) =>
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
    .then((groupEvents) => groupEvents.map((ge) => ge.event)); // return the associated events
};
