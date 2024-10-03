import React, { useState } from "react";
import { createGroup, addUserToGroup } from "../../services/groupServices";
import "./CreateGroup.css";

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
    createGroup({ name: groupName })
      .then((newGroup) => {
        if (!newGroup || !newGroup.id) {
          throw new Error("Failed to retrieve group ID from response");
        }

        return addUserToGroup({
          userId: currentUser.id,
          groupId: newGroup.id,
        });
      })
      .then(() => {
        console.log("Group created and user added");
      });
  };

  return (
    <div className="create-group-container">
      <div className="glass-card">
        <h2>Create a New Group</h2>

        <form onSubmit={handleSubmit}>
          <label className="form-label">
            Group Name:
            <input
              type="text"
              value={groupName}
              onChange={handleInputChange}
              placeholder="Enter group name"
              className="input-field"
              required
            />
          </label>
          <br />
          <button type="submit" className="submit-button">
            Create Group
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};
