import React from "react";

export const EventDetailsModal = ({
  selectedEvent,
  handleCloseEventDetailsModal,
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleCloseEventDetailsModal}>
          &times;
        </span>
        <h2>Event Details</h2>
        <p>
          <strong>Title:</strong> {selectedEvent.title}
        </p>
        <p>
          <strong>Description:</strong> {selectedEvent.description || "N/A"}
        </p>
        <p>
          <strong>User:</strong> {selectedEvent.user.firstName}{" "}
          {selectedEvent.user.lastName}
        </p>
        <p>
          <strong>Start Date:</strong> {selectedEvent.start}
        </p>
        <p>
          <strong>End Date:</strong> {selectedEvent.end || "N/A"}
        </p>
        <p>
          <strong>Time:</strong> {selectedEvent.time || "N/A"}
        </p>
        <p>
          <strong>Recurring:</strong> {selectedEvent.recurring ? "Yes" : "No"}
        </p>
        {selectedEvent.recurring && (
          <p>
            <strong>Frequency:</strong> {selectedEvent.frequency}
          </p>
        )}
        <p>
          <strong>Created At:</strong> {selectedEvent.createdAt}
        </p>
      </div>
    </div>
  );
};
