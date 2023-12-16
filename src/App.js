import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserFeed from "./pages/UserFeed/UserFeed";
import SinglePostView from "./pages/SinglePostView/SinglePostView";
import UserProfile from "./pages/profile/UserProfile";
import Explore from "./pages/explore/Explore";
import BookMark from "./pages/bookmark/BookMark";
import Login from "./pages/Authentication/Login";
import SignUp from "./pages/Authentication/SignUp";
import RequiresAuth from "./components/RequiresAuth";
import Avtar from "./pages/Avtar/Avtar";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/pages/Authentication/SignUp" element={<SignUp />} />
        <Route path="/pages/Avtar/Avtar" element={<Avtar />} />
        <Route
          path="/pages/UserFeed/UserFeed"
          element={
            // <RequiresAuth>
            <UserFeed />
            // </RequiresAuth>
          }
        />
        <Route
          path="/pages/SinglePostView/"
          element={
            // <RequiresAuth>
            <SinglePostView />
            // </RequiresAuth>
          }
        />
        <Route
          path="/pages/profile/UserProfile"
          element={
            // <RequiresAuth>
            <UserProfile />
            // </RequiresAuth>
          }
        />
        <Route
          path="/pages/explore/Explore"
          element={
            // <RequiresAuth>
            <Explore />
            // </RequiresAuth>
          }
        />
        <Route
          path="/pages/bookmark/BookMark"
          element={
            // <RequiresAuth>
            <BookMark />
            // </RequiresAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
