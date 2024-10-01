import { useEffect } from "react";
import { useState } from "react";
import { getUsers } from "../../services/userServices";

export const UsersList = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getUsers().then((allUsersArray) => {
      setAllUsers(allUsersArray);
    });
  }, []);

  return (
    <section className="usersList-container">
      {allUsers.map((user) => {
        return (
          <div key={user.id} className="users">
            <div>{user.firstName}</div>
          </div>
        );
      })}
    </section>
  );
};
