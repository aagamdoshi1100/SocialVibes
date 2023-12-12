export const InitialValueFeedContext = {
  postsData: [],
  selectedPostData: [],
  userProfileView: [],
  bookMarkView: [],
  followedUsers: [],
  followedUserPosts: [],
  fetchValue: "",
  showFiltersUserFeed: false,
  createPostContent: null,
  createPostImage: null,
  filterBy: "",
  showEditUserFeed: false,
  indexOfPost: "",
  previewUploadedImage: false,
};

export default function UserFeedReducer(state, action) {
  switch (action.type) {
    case "ALL_POSTS":
      return {
        ...state,
        postsData: action.payload.data,
        fetchValue: action.payload.value,
        previewUploadedImage: false,
        createPostContent: null,
        createPostImage: null,
        followedUserPosts: [...action.payload.data].filter((item) =>
          state.followedUsers.includes(item.username)
        ),
        userProfileView: state.userProfileView.filter(
          (item) => item._id !== action.payload.postId
        ),
        bookMarkView: state.bookMarkView.filter(
          (item) => item._id !== action.payload.postId
        ),
      };
    case "SELECTED_POST":
      return {
        ...state,
        selectedPostData: [action.payload.data],
        fetchValue: action.payload.value,
      };
    case "BOOKMARK_POST_HANDLER":
      const modifiedData = [...action.payload.data].map((post) => {
        return {
          ...post,
          image: state.postsData.find((item) => item._id === post._id).image,
          likes: state.postsData.find((item) => item._id === post._id).likes,
        };
      });
      console.log(modifiedData, "modifiedData");
      return { ...state, bookMarkView: modifiedData };
    case "BOOKMARK_PAGE":
    case "HOME_PAGE":
    case "EXPLORE_PAGE":
      return { ...state, fetchValue: action.payload };
    case "LIKE_STATUS":
      const getBooMarkedPostsId = state.bookMarkView.map((item) => {
        return item._id;
      });
      return {
        ...state,
        postsData: [...action.payload.data],
        followedUserPosts: [...action.payload.data].filter((item) =>
          localStorage.getItem("Followings").split(",").includes(item.username)
        ),
        bookMarkView: [...action.payload.data]?.filter((item) =>
          getBooMarkedPostsId?.includes(item._id)
        ),
      };
    case "SHOW_FILTERS":
      return { ...state, showFiltersUserFeed: !action.payload };
    case "THREE_DOT_CONTROLLER":
      return { ...state, indexOfPost: action.payload.indexOfPost };

    case "SORT_BY_LATEST":
      return {
        ...state,
        postsData: action.payload.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
        filterBy: "Latest Posts",
      };
    case "SORT_BY_OLDEST":
      return {
        ...state,
        postsData: action.payload.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        ),
        filterBy: "Oldest Posts",
      };
    case "SORT_BY_TRENDING":
      return {
        ...state,
        postsData: action.payload.sort(
          (a, b) => b.likes.likeCount - a.likes.likeCount
        ),
        filterBy: "Trending Posts",
      };
    case "CREATE_POST_IMAGE":
      return { ...state, createPostImage: action.payload };
    case "CREATE_POST_CONTENT":
      return { ...state, createPostContent: action.payload };
    case "EDIT_CONTROLLER":
      return { ...state, showEditUserFeed: !action.payload };
    case "EDIT_POST_HANDLER":
      return {
        ...state,
        postsData: action.payload.data,
        followedUserPosts: state.followedUserPosts.map((obj) => {
          if (action.payload.postId === obj._id) {
            return {
              ...action.payload.data.find(
                (item) => item._id === action.payload.postId
              ),
            };
          }
          return obj;
        }),
        showEditUserFeed: !action.payload.showEditUserFeed,
        fetchValue: action.payload.value,
        createPostImage: null,
        createPostContent: null,
        indexOfPost: "",
      };
    case "PREVIEW":
      return { ...state, previewUploadedImage: !action.payload };

    case "USER_PROFILE":
      return {
        ...state,
        userProfileView: action.payload.data,
        fetchValue: action.payload.value,
      };
    case "FOLLOW_USER":
      const userFollowedDetails = state.postsData.filter((item) =>
        [...action.payload.allFollowingUsers].includes(item.username)
      );
      return {
        ...state,
        followedUserPosts: userFollowedDetails,
        followedUsers: action.payload.allFollowingUsers,
        fetchValue: action.payload.value,
      };
    case "LOGGED_IN_USERNAME_AND_POSTS":
      const userFollowedDetails1 = state.postsData.filter((item) =>
        [action.payload.username].includes(item.username)
      );
      return {
        ...state,
        followedUserPosts: userFollowedDetails1,
        fetchValue: action.payload.value,
        followedUsers: [action.payload.username],
      };
    default:
      return { state };
  }
}
