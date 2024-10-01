import { NavBar } from "../components/nav/NavBar";
import { Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Home } from "../components/home/Home";
import { CalendarComponent } from "../components/calendar/Calendar";
import { useState, useEffect } from "react";
import { UserGroups } from "../components/groups/UserGroups";
import { CreateGroup } from "../components/groups/CreateGroup";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localChronoUser = localStorage.getItem("chrono_user");
    if (localChronoUser) {
      const chronoUserObject = JSON.parse(localChronoUser);
      setCurrentUser(chronoUserObject);
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
        <Route path="create-group" element={<CreateGroup />} />
      </Route>
    </Routes>
  );
};
