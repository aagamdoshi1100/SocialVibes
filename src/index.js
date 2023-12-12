import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserFeedContextProvider } from "./contexts/UserFeedContext";
import { AuthContextProvider } from "./contexts/AuthContext";
import { FollowContextProvider } from "./contexts/FollowContext";
import IconContextProvider from "./contexts/IconContext";
import UserProfileContextProvider from "./contexts/UserProfileContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <UserFeedContextProvider>
          <FollowContextProvider>
            <IconContextProvider>
              <UserProfileContextProvider>
                <App />
              </UserProfileContextProvider>
            </IconContextProvider>
          </FollowContextProvider>
        </UserFeedContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
