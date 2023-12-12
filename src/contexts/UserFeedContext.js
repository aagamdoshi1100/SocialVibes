import { createContext, useContext, useEffect, useReducer } from "react";
import UserFeedReducer, {
  InitialValueFeedContext,
} from "../reducer/UserFeedReducer";
import useAuthContext from "./AuthContext";

const UserFeedContext = createContext();

export const UserFeedContextProvider = ({ children }) => {
  const [userFeed, userFeedDispacher] = useReducer(
    UserFeedReducer,
    InitialValueFeedContext
  );
  const { navigate } = useAuthContext();
  const token = localStorage.getItem("encodedToken");

  const postBookMarkHandler = async (postId) => {
    try {
      const response = await fetch(`/api/users/bookmark/${postId}`, {
        method: "POST",
        headers: { authorization: token },
      });
      const responseData = await response.json();
      console.log(response, responseData, "response");

      if (response.status === 200) {
        userFeedDispacher({
          type: "BOOKMARK_POST_HANDLER",
          payload: { data: responseData.bookmarks },
        });
      }
      if (response.status === 400) {
        try {
          const responseError = await fetch(
            `/api/users/remove-bookmark/${postId}`,
            {
              method: "POST",
              headers: { authorization: token },
            }
          );
          const responseErrorData = await responseError.json();
          console.log(
            "🚀 ~ file: UserFeedContext.js:31 ~ postBookMarkHandler ~ responseErrorData:",
            responseErrorData
          );
          userFeedDispacher({
            type: "BOOKMARK_POST_HANDLER",
            payload: { data: responseErrorData.bookmarks },
          });
        } catch (e) {
          console.log(
            "🚀 ~ file: UserFeedContext.js:32 ~ postBookMarkHandler ~ e:",
            e
          );
        }
      }
    } catch (e) {
      console.log(
        "🚀 ~ file: UserFeedContext.js:17 ~ postBookMarkHandler ~ e:",
        e
      );
    }
  };
  const getSelectedPost = async (postId) => {
    try {
      const response = await fetch(`/api/posts/${postId}`);
      const responseData = await response.json();
      userFeedDispacher({
        type: "SELECTED_POST",
        payload: { data: responseData.post, value: "selectedPostData" },
      });
      navigate("/pages/SinglePostView/");
    } catch (e) {
      console.log("🚀 ~ file: UserFeedContext.js:25 ~ getSelectedPost ~ e:", e);
    }
  };

  const deletePostHandler = async (postId) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: { authorization: token },
      });
      const responseData = await response.json();
      userFeedDispacher({
        type: "ALL_POSTS",
        payload: {
          data: responseData.posts,
          value: userFeed.fetchValue,
          postId,
        },
      });
    } catch (e) {
      console.log("🚀 ~ file: UserFeedContext.js:32 ~ editHandler ~ e:", e);
    }
  };
  const editHandler = async (postId) => {
    const post = {
      content:
        userFeed.createPostContent === null ||
        userFeed.createPostContent === undefined
          ? userFeed?.followedUserPosts?.find((obj) => obj._id === postId)
              .content
          : userFeed.createPostContent,
      image:
        userFeed.createPostImage === null ||
        userFeed.createPostImage === undefined
          ? userFeed?.followedUserPosts?.find((obj) => obj._id === postId).image
          : URL.createObjectURL(userFeed.createPostImage),
    };
    try {
      const response = await fetch(`/api/posts/edit/${postId}`, {
        method: "POST",
        headers: { authorization: token },
        body: JSON.stringify({ postData: post }),
      });
      console.log(response, "response");
      const responseData = await response.json();
      console.log(responseData, "res");
      userFeedDispacher({
        type: "EDIT_POST_HANDLER",
        payload: {
          data: responseData.posts,
          postId,
          showEditUserFeed: userFeed.showEditUserFeed,
          value: userFeed.fetchValue,
        },
      });
    } catch (e) {
      console.log("🚀 ~ file: UserFeedContext.js:32 ~ editHandler ~ e:", e);
    }
  };

  const postLikeHandler = async (postId) => {
    try {
      const response = await fetch(`/api/posts/like/${postId}`, {
        method: "POST",
        headers: { authorization: token },
      });
      const responseData = await response.json();
      if (response.status === 201) {
        userFeedDispacher({
          type: "LIKE_STATUS",
          payload: { data: responseData.posts, postId: postId },
        });
      } else {
        try {
          const responsedislike = await fetch(`/api/posts/dislike/${postId}`, {
            method: "POST",
            headers: { authorization: token },
          });
          const responseDisData = await responsedislike.json();
          userFeedDispacher({
            type: "LIKE_STATUS",
            payload: { data: responseDisData.posts },
          });
        } catch (e) {
          console.log("400 erro code", e);
        }
      }
    } catch (e) {
      console.log("🚀 ~ file: UserFeedContext.js:20 ~ likePost ~ e:", e);
    }
  };
  const createPost = async () => {
    const post = {
      content: userFeed.createPostContent,
      image:
        userFeed.createPostImage === null ||
        userFeed.createPostImage === undefined
          ? ""
          : URL.createObjectURL(userFeed.createPostImage),
    };
    console.log(post, "post");
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { authorization: token },
        body: JSON.stringify({ postData: post }),
      });
      const responseData = await response.json();
      console.log(
        "🚀 ~ file: UserFeedContext.js:123 ~ createPost ~ responseData:",
        responseData
      );
      userFeedDispacher({
        type: "ALL_POSTS",
        payload: { data: responseData.posts, value: userFeed.fetchValue },
      });
    } catch (e) {
      console.log("🚀 ~ file: UserFeedContext.js:17 ~ createPost ~ e:", e);
    }
  };

  const fetchAllPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      const responseData = await response.json();
      userFeedDispacher({
        type: "ALL_POSTS",
        payload: { data: responseData.posts, value: "followedUserPosts" },
      });
    } catch (e) {
      console.log("🚀 ~ file: UserFeedContext.js:12 ~ fetchAllPosts ~ e:", e);
    }
  };
  useEffect(() => {
    fetchAllPosts();
  }, []);
  return (
    <UserFeedContext.Provider
      value={{
        userFeed,
        userFeedDispacher,
        createPost,
        postLikeHandler,
        editHandler,
        deletePostHandler,
        getSelectedPost,
        navigate,
        postBookMarkHandler,
      }}
    >
      {children}
    </UserFeedContext.Provider>
  );
};

const useUserFeedContext = () => useContext(UserFeedContext);
export default useUserFeedContext;
