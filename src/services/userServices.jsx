export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`).then((response) =>
    response.json()
  );
};

export const createUser = (user) => {
  return fetch("http://localhost:8088/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

export const getUsers = () => {
  return fetch(`http://localhost:8088/users`).then((response) =>
    response.json()
  );
};

export const getUsersByGroup = () => {
  return fetch(
    `http://localhost:8088/userGroups?_expand=user&_expand=group`
  ).then((response) => response.json());
};
