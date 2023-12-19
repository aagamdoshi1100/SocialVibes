export const InitialValueFeedContext = {
  allPosts: [],
  createPost: {
    loading: false,
    enabled: false,
    createPostContent: "",
    createPostImage: "",
  },
  showFiltersUserFeed: false,
  filterBy: "",
  showEditUserFeed: false,
  indexOfPost: "",
  previewUploadedImage: false,
};

export default function UserFeedReducer(state, action) {
  switch (action.type) {
    case "MANAGE_NEW_POSTS":
      return {
        ...state,
        createPost: {
          ...state.createPost,
          enabled: !state.createPost.enabled,
        },
      };
    case "UPLOAD_POST":
      return {
        ...state,
        createPost: {
          ...state.createPost,
          loading: true,
        },
      };
    case "CREATE_POST_IMAGE":
      return {
        ...state,
        createPost: {
          ...state.createPost,
          createPostImage: action.payload,
        },
      };
    case "CREATE_POST_CONTENT":
      return {
        ...state,
        createPost: {
          ...state.createPost,
          createPostContent: action.payload,
        },
      };
    case "CREATE_POST":
      return {
        ...state,
        allPosts: [...state.allPosts, action.payload.data],
        createPost: {
          ...state.createPost,
          loading: false,
          enabled: false,
          createPostContent: "",
          createPostImage: "",
        },
      };
    case "DISCARD_POST_CREATION":
      return {
        ...state,
        createPost: {
          ...state.createPost,
          enabled: false,
          createPostContent: "",
          createPostImage: "",
        },
      };
    case "BOOKMARK_PAGE":
    case "HOME_PAGE":
    case "EXPLORE_PAGE":
      return { ...state, fetchValue: action.payload };

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
      return {
        ...state,
      };
    default:
      return { state };
  }
}
