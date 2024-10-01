import React, { useState } from "react";
import { createGroup, addUserToGroup } from "../../services/groupServices"; // Assuming these are API calls

export const CreateGroup = ({ currentUser }) => {
  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!groupName) {
      setError("Group name is required");
      return;
    }

    createGroup({ name: groupName }).then((newGroup) => {
      addUserToGroup({
        userId: currentUser.id,
        groupId: newGroup.id,
      });
    });
  };

  return (
    <div>
      <h2>Create a New Group</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Group Name:
          <input
            type="text"
            value={groupName}
            onChange={handleInputChange}
            placeholder="Enter group name"
            required
          />
        </label>
        <br />
        <button type="submit">Create Group</button>
      </form>
    </div>
  );
};
