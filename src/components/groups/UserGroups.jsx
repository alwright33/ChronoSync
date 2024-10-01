import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { getUsersByGroup } from "../../services/userServices";
import "./UserGroups.css";

export const UserGroups = ({ currentUser }) => {
  const [groups, setGroups] = useState([]);
  const [members, setMembers] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

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

  const handleCreateGroup = () => {
    navigate("/create-group"); // Navigate to the create group view
  };

  return (
    <main className="user-groups-main">
      <section className="groups-container">
        <div className="button-container">
          <button
            type="button"
            className="group-button"
            onClick={handleCreateGroup}
          >
            Create New Group
          </button>
        </div>
        {groups.length > 0 ? (
          groups.map((group) => (
            <div key={group.id} className="group">
              <header>
                <h1>{group.name}</h1>
              </header>
              <div>
                {members[group.id]?.length > 0 ? (
                  <ul className="group-members-list">
                    {members[group.id].map((member) => (
                      <li key={member.user.id}>
                        {member.user.firstName} {member.user.lastName}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No members in this group.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>You are not a part of any groups.</p>
        )}
      </section>
    </main>
  );
};
