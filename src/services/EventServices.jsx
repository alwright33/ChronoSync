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
