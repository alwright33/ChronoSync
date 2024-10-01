import { useEffect, useState } from "react";
import { getUsersByGroup } from "../../services/userServices";
import "./UserGroups.css";

export const UserGroups = ({ currentUser }) => {
  const [groups, setGroups] = useState([]);
  const [members, setMembers] = useState({});
  useEffect(() => {
    if (currentUser?.id) {
      getUsersByGroup().then((groupData) => {
        const userGroups = groupData.filter(
          (usersGroup) => usersGroup.user.id === currentUser.id
        );

        if (userGroups.length > 0) {
          setGroups(userGroups.map((group) => group.group));
          const groupMembers = {};
          userGroups.forEach((userGroup) => {
            const groupId = userGroup.group.id;
            const membersInGroup = groupData.filter(
              (user) => user.group?.id === groupId
            );
            groupMembers[groupId] = membersInGroup;
          });

          setMembers(groupMembers);
        }
      });
    }
  }, [currentUser]);

  return (
    <section className="groups-container">
      {groups.length > 0 ? (
        groups.map((group) => (
          <div key={group.id} className="group">
            <header>
              <h1>{group.name}</h1>
            </header>
            <div>
              <ul className="group-members-list">
                {members[group.id]?.map((member) => (
                  <li key={member.user.id}>
                    {member.user.firstName} {member.user.lastName}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p>You are not a part of any groups.</p>
      )}
    </section>
  );
};
