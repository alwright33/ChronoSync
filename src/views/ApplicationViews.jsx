import { NavBar } from "../components/nav/NavBar";
import { Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Home } from "../components/home/Home";
import { useState, useEffect } from "react";
import { UserGroups } from "../components/groups/UserGroups";
import { CreateGroup } from "../components/groups/CreateGroup";
import { MySchedule } from "../components/schedules/MySchedule";
import { CalendarPage } from "../components/calendar/Calendar";
import { CreateEvent } from "../components/events/CreateEvent";

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
          element={<CalendarPage currentUser={currentUser} />}
        />
        <Route
          path="groups"
          element={<UserGroups currentUser={currentUser} />}
        />
        <Route
          path="create-group"
          element={<CreateGroup currentUser={currentUser} />}
        />
        <Route
          path="my-schedule"
          element={<MySchedule currentUser={currentUser} />}
        />
        <Route
          path="create-event"
          element={<CreateEvent currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
