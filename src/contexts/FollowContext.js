import { createContext, useContext, useEffect, useReducer } from "react";
import {
  InitialValueFollowContext,
  UserFollowReducer,
} from "../reducer/UserFollowReducer";
import useUserFeedContext from "./UserFeedContext";
import useAuthContext from "./AuthContext";
const FollowContext = createContext();

export const FollowContextProvider = ({ children }) => {
  const [infinityUsers, infinityUsersDispacher] = useReducer(
    UserFollowReducer,
    InitialValueFollowContext
  );
  const { userFeed, userFeedDispacher } = useUserFeedContext();
  const { user, setUser } = useAuthContext();
  const token = localStorage.getItem("encodedToken");

  const handleComment = () => {
    infinityUsersDispacher({ type: "SAVE_COMMENT" });
  };
  const deleteComment = (comment) => {
    infinityUsersDispacher({ type: "DELETE_COMMENT", payload: comment });
  };
  const followUser = async (followUserId) => {
    try {
      const response = await fetch(`/api/users/follow/${followUserId}`, {
        method: "POST",
        headers: { authorization: token },
      });
      const responseData = await response.json();

      if (response.status === 200) {
        const followingUsers = [
          ...userFeed.followedUsers,
          responseData.followUser.username,
        ];
        localStorage.setItem("Followings", followingUsers);
        userFeedDispacher({
          type: "FOLLOW_USER",
          payload: {
            allFollowingUsers: followingUsers,
            value: userFeed.fetchValue,
          },
        });
      }
      if (response.status === 400) {
        try {
          const responseError = await fetch(
            `/api/users/unfollow/${followUserId}`,
            {
              method: "POST",
              headers: { authorization: token },
            }
          );
          const responseErrorData = await responseError.json();
          const unfollowingUserRemoved = userFeed.followedUsers.filter(
            (user) => user !== responseErrorData.followUser.username
          );
          userFeedDispacher({
            type: "FOLLOW_USER",
            payload: {
              allFollowingUsers: unfollowingUserRemoved,
              value: userFeed.fetchValue,
            },
          });
        } catch (e) {
          console.log("🚀 ~ file: FollowContext.js:27 ~ followUser ~ e:", e);
        }
      }
    } catch (e) {
      console.log("🚀 ~ file: FollowContext.js:15 ~ followUser ~ e:", e);
    }
  };
  const fetchInfinityUsers = async () => {
    try {
      const response = await fetch(`/api/users`);
      const responseData = await response.json();
      infinityUsersDispacher({
        type: "ALL_USERS",
        payload: responseData.users,
      });
    } catch (e) {
      console.log(
        "🚀 ~ file: FollowContext.js:13 ~ fetchInfinityUsers ~ e:",
        e
      );
    }
  };
  useEffect(() => {
    userFeedDispacher({
      type: "LOGGED_IN_USERNAME_AND_POSTS",
      payload: { username: user.name, value: "followedUserPosts" },
    });
    // console.log("Updated user state to show user posts:", user);
  }, [user]);
  useEffect(() => {
    fetchInfinityUsers();
  }, []);
  return (
    <FollowContext.Provider
      value={{
        infinityUsers,
        followUser,
        infinityUsersDispacher,
        handleComment,
        deleteComment,
      }}
    >
      {children}
    </FollowContext.Provider>
  );
};

const useFollowContext = () => useContext(FollowContext);
export default useFollowContext;
