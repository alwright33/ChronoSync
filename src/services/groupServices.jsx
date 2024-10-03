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
