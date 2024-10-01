import { NavBar } from "../components/nav/NavBar";
import { Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Home } from "../components/home/Home";
import { CalendarComponent } from "../components/calendar/Calendar"; // Import the Calendar component
import { useState, useEffect } from "react";
import { UserGroups } from "../components/users/UserGroups";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localChronoUser = localStorage.getItem("chrono_user");
    if (localChronoUser) {
      const chronoUserObject = JSON.parse(localChronoUser);
      setCurrentUser(chronoUserObject); // Correctly setting current user
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route path="/" element={<Home />} />
        <Route
          path="calendar"
          element={<CalendarComponent currentUser={currentUser} />}
        />
        <Route
          path="groups"
          element={<UserGroups currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
