import { createContext, useContext, useReducer } from "react";
import {
  InitialValueUserProfile,
  UserProfileReducer,
} from "../reducer/UserProfileReducer";
import useUserFeedContext from "./UserFeedContext";

const UserProfileContext = createContext();

export default function UserProfileContextProvider({ children }) {
  const [profile, profileDispacher] = useReducer(
    UserProfileReducer,
    InitialValueUserProfile
  );
  const { userFeed, navigate, userFeedDispacher } = useUserFeedContext();
  const token = localStorage.getItem("encodedToken");
  const editUserProfile = async () => {
    const data = {
      bio: profile.bioValue,
      portfolio: profile.portfolioURL,
      profileIcon: profile.avatarValue,
    };
    try {
      const response = await fetch("/api/users/edit", {
        method: "POST",
        headers: { authorization: token },
        body: JSON.stringify({ userData: data }),
      });
      const responseData = await response.json();
      console.log("editres", responseData);
      profileDispacher({
        type: "UPDATE_USER_PROFILE",
        payload: { userData: responseData.user, status: profile.isEditProfile },
      });
    } catch (e) {
      console.log("🚀 ~ file: UserFeedContext.js:48 ~ editUserProfile ~ e:", e);
    }
  };
  const getUserProfile = async (userId, username) => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      const responseData = await response.json();
      // console.log("UserDetails", responseData)
      const filtered = userFeed.postsData.filter(
        (posts) => posts.username === username
      );
      // console.log("🚀 ~ file: UserFeedContext.js:29 ~ getUserProfile ~ filtered:", filtered)
      userFeedDispacher({
        type: "USER_PROFILE",
        payload: { data: filtered, value: "userProfileView" },
      });
      profileDispacher({
        type: "USER_PROFILE",
        payload: { userData: responseData.user },
      });
      navigate(`/pages/profile/UserProfile`);
    } catch (e) {
      console.log("🚀 ~ file: AuthContext.js:27 ~ getUserProfile ~ e:", e);
    }
  };
  return (
    <UserProfileContext.Provider
      value={{ profile, profileDispacher, editUserProfile, getUserProfile }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

export const useUserProfileContext = () => useContext(UserProfileContext);
