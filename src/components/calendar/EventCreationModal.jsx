import React from "react";

export const EventCreationModal = ({
  newEvent,
  categories,
  handleInputChange,
  handleSubmitEvent,
  handleCloseModal,
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleCloseModal}>
          &times;
        </span>
        <h2>Schedule Event</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmitEvent();
          }}
        >
          <label>
            Event Title:
            <input
              type="text"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            Start Date:
            <input
              type="date"
              name="start"
              value={newEvent.start}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            End Date:
            <input
              type="date"
              name="end"
              value={newEvent.end}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Start Time:
            <input
              type="time"
              name="time"
              value={newEvent.time}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="recurring"
              checked={newEvent.recurring}
              onChange={handleInputChange}
            />
            Recurring Event
          </label>
          {newEvent.recurring && (
            <>
              <label>
                Frequency:
                <select
                  name="frequency"
                  value={newEvent.frequency}
                  onChange={handleInputChange}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </label>
            </>
          )}
          <br />
          <label>
            Category:
            <select
              name="categoryId"
              value={newEvent.categoryId}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <br />
          <button type="submit">Add Event</button>
        </form>
      </div>
    </div>
  );
};
