import { NavBar } from "../components/nav/NavBar";
import { Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Home } from "../components/home/Home";
import { useState, useEffect } from "react";
import { UserGroups } from "../components/groups/UserGroups";
import { CreateGroup } from "../components/groups/CreateGroup";
import { MySchedule } from "../components/schedules/MySchedule";
import { CreateEvent } from "../components/events/CreateEvent";
import { UserEvents } from "../components/events/Events";
import { UpdateEvent } from "../components/events/UpdateEvent";

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
        <Route path="/user-events/:userId" element={<UserEvents />} />
        <Route path="/update-event/:eventId" element={<UpdateEvent />} />
      </Route>
    </Routes>
  );
};
