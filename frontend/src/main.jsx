import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Timeline from "./components/Timeline.jsx";
import TimelineSelection from "./components/TimelineSelection.jsx";
import MapSlider from "./components/SliderMap.jsx";
import Chat from "./components/Chat";
import HistoryQuiz from "./components/Quiz.jsx";
import Leaderboard from "./components/Leaderboard.jsx";
import Model3d from "./components/3dmodel.jsx";
import Map from "./components/map/MapsApp.jsx";
import { timelineData } from "./components/data/timelineData";
import VRMuseumQRCode from "./components/qr.jsx";

import HistoricalFigures from "./components/HistoricalFigures";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/timeline" element={<TimelineSelection />} />
      <Route path="/mapslider" element={<MapSlider />} />
      <Route path="/vr-museum" element={<VRMuseumQRCode />} />
      <Route
        path="/chat"
        element={<HistoricalFigures/>}
      />
      <Route path="/map" element={<Map />} />
      <Route
        path="/3d"
        element={<Model3d modelUrl="julius.glb" caption="Julius ceasar" />}
      />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/quiz" element={<HistoryQuiz />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
