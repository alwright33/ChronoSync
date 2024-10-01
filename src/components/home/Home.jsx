import "./Home.css";

export const Home = () => {
  return (
    <section className="home-container">
      <header>
        <h1 className="welcome-heading">
          Welcome to <span>ChronoSync</span>
        </h1>
        <h3 className="sub-heading">
          Your ultimate solution for seamless time management and
          synchronization!
        </h3>
      </header>
      <div className="chrono-info">
        <p>
          Whether you're coordinating across teams, managing personal tasks, or
          keeping track of important deadlines, ChronoSync helps you stay in
          control.
        </p>
        <p>
          Our user-friendly interface ensures that you can effortlessly
          schedule, synchronize, and organize your time, keeping everything
          aligned and in sync.
        </p>
        <p>
          Explore how ChronoSync can streamline your workflow, boost
          productivity, and help you make the most of every moment.{" "}
          <strong>Let's make time work for you!</strong>
        </p>
      </div>
      <div className="features-section">
        <div className="feature-card">
          <h4>Real-Time Sync</h4>
          <p>Keep your tasks and schedules in sync across all devices.</p>
        </div>
        <div className="feature-card">
          <h4>Collaboration Made Easy</h4>
          <p>Coordinate with teams and share your availability instantly.</p>
        </div>
        <div className="feature-card">
          <h4>Boost Productivity</h4>
          <p>Track deadlines, tasks, and milestones with ease.</p>
        </div>
      </div>
    </section>
  );
};
