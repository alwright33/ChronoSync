export const createGroup = (groupData) => {
  return fetch(`http://localhost:8088/groups`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(groupData),
  }).then((response) => response.json());
};

export const addUserToGroup = (userGroupData) => {
  return fetch(`http://localhost:8088/userGroups`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userGroupData),
  }).then((response) => response.json());
};

export const getUserGroups = (userId) => {
  return fetch(
    `http://localhost:8088/userGroups?userId=${userId}&_expand=group`
  )
    .then((response) => response.json())
    .then((userGroups) => userGroups.map((ug) => ug.group)); // return the associated groups
};
