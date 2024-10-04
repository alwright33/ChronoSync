import { useState, useEffect } from "react";
import { updateEventById, getEventById } from "../../services/EventServices";
import { useNavigate, useParams } from "react-router-dom";
import "./CreateEvent.css";
import { getCategories } from "../../services/categoryServices";

export const UpdateEvent = ({ currentUser }) => {
  const { eventId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [time, setTime] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [frequency, setFrequency] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getEventById(eventId).then((eventData) => {
      setTitle(eventData.title);
      setDescription(eventData.description);
      setStart(eventData.start);
      setEnd(eventData.end);
      setTime(eventData.time);
      setRecurring(eventData.recurring);
      setFrequency(eventData.frequency || "");
      setCategory(eventData.categoryId || "");
      setUserId(eventData.userId);
    });

    getCategories().then((data) => setCategories(data));
  }, [eventId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedEvent = {
      title,
      description,
      start,
      end,
      time,
      recurring,
      frequency,
      categoryId: parseInt(category),
      userId: userId,
      createdAt: new Date().toISOString(),
    };

    updateEventById(eventId, updatedEvent).then(() => {
      navigate("/my-schedule");
    });
  };

  return (
    <div className="create-event-container">
      <h1>Update Event</h1>
      <form onSubmit={handleSubmit} className="create-event-form">
        <div className="form-group">
          <label htmlFor="title">Event Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">-- Select a Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="start">Start Date:</label>
          <input
            type="date"
            id="start"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="end">End Date:</label>
          <input
            type="date"
            id="end"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="recurring">Recurring:</label>
          <input
            type="checkbox"
            id="recurring"
            checked={recurring}
            onChange={() => setRecurring(!recurring)}
          />
        </div>

        {recurring && (
          <div className="form-group">
            <label htmlFor="frequency">Frequency:</label>
            <input
              type="text"
              id="frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            />
          </div>
        )}

        <button type="submit">Update Event</button>
      </form>
    </div>
  );
};
