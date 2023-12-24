import { createContext, useContext, useEffect, useReducer } from "react";
import UserFeedReducer, {
  InitialValueFeedContext,
} from "../reducer/UserFeedReducer";
import useAuthContext from "./AuthContext";
import { API_URL } from "../constants";

const UserFeedContext = createContext();

export const UserFeedContextProvider = ({ children }) => {
  const [userFeed, userFeedDispacher] = useReducer(
    UserFeedReducer,
    InitialValueFeedContext
  );
  const { navigate } = useAuthContext();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  // const username = localStorage.getItem("username");

  const enablePostMenu = (postId) => {
    userFeedDispacher({
      type: "ENABLE_POST_MENU",
      payload: postId,
    });
  };

  const enableEdit = (postId) => {
    userFeedDispacher({
      type: "ENABLE_POST_EDIT",
      payload: postId,
    });
  };

  const postBookMarkHandler = async (postId) => {
    try {
      const response = await fetch(`${API_URL}/bookmark/${postId}/${userId}`, {
        method: "POST",
        headers: { authorization: token },
      });
      const responseData = await response.json();
      if (response.status === 200) {
        userFeedDispacher({
          type: "BOOKMARK_POST_HANDLER",
          payload: responseData.bookmarks,
        });
      }
    } catch (e) {
      console.error(
        "file: UserFeedContext.js:17 ~ postBookMarkHandler ~ e:",
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

  const deletePost = async (postId) => {
    try {
      const response = await fetch(`${API_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: { authorization: token },
      });
      const responseData = await response.json();
      userFeedDispacher({
        type: "DELETE_POST",
        payload: postId,
      });
    } catch (e) {
      console.error(" file: UserFeedContext.js:32 ~ editHandler ~ e:", e);
    }
  };

  const editPost = async () => {
    const post = {
      content: userFeed.createPost.createPostContent,
      image: userFeed.createPost.createPostImage,
    };
    try {
      const response = await fetch(`${API_URL}/posts/edit/${userFeed.postId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", authorization: token },
        body: JSON.stringify({ post }),
      });
      const responseData = await response.json();
      userFeedDispacher({
        type: "EDIT_POST_HANDLER",
        payload: {
          data: responseData.editedPost,
          postId: userFeed.postId,
        },
      });
    } catch (e) {
      console.error("🚀 ~ file: UserFeedContext.js:32 ~ editHandler ~ e:", e);
    }
  };

  const postLikeHandler = async (postId, likedBy) => {
    try {
      const response = await fetch(`${API_URL}/posts/${postId}/likeHandler`, {
        method: "POST",
        headers: { "Content-Type": "applications/json", authorization: token },
        body: JSON.stringify({ likedBy }),
      });
      const responseData = await response.json();
      if (response.status === 201) {
        userFeedDispacher({
          type: "LIKE_HANDLER",
          payload: { postId, likedBy },
        });
      }
    } catch (e) {
      console.error("🚀 ~ file: UserFeedContext.js:20 ~ likePost ~ e:", e);
    }
  };

  const createPost = async () => {
    const post = {
      content: userFeed.createPost.createPostContent,
      image: userFeed.createPost.createPostImage,
      user: userId,
      likes: 0,
      dislike: 0,
      likedBy: [],
      comment: [],
    };
    try {
      userFeedDispacher({
        type: "UPLOAD_POST",
      });
      const response = await fetch(`${API_URL}/posts/${userId}/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json", authorization: token },
        body: JSON.stringify(post),
      });
      const responseData = await response.json();
      userFeedDispacher({
        type: "CREATE_POST",
        payload: { data: responseData.data, value: userFeed.fetchValue },
      });
    } catch (e) {
      console.error("file: UserFeedContext.js:17 ~ createPost ~ e:", e);
    }
  };

  const fetchAllPosts = async () => {
    try {
      const fetchPosts = await fetch(`${API_URL}/posts`);
      const posts = await fetchPosts.json();
      userFeedDispacher({
        type: "ALL_POSTS",
        payload: posts.posts,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <UserFeedContext.Provider
      value={{
        userFeed,
        userFeedDispacher,
        createPost,
        postLikeHandler,
        getSelectedPost,
        navigate,
        postBookMarkHandler,
        fetchAllPosts,
        enablePostMenu,
        enableEdit,
        editPost,
        deletePost,
      }}
    >
      {children}
    </UserFeedContext.Provider>
  );
};

const useUserFeedContext = () => useContext(UserFeedContext);
export default useUserFeedContext;
