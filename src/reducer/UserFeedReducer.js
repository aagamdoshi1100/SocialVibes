export const InitialValueFeedContext = {
  allPosts: [],
  createPost: {
    loading: false,
    enabled: false,
    createPostContent: "",
    createPostImage: "",
  },
  postMenu: false,
  postId: "",
  editPost: false,

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
        postId: "",
        editPost: false,
      };
    case "ALL_POSTS":
      return {
        ...state,
        allPosts: action.payload,
      };
    case "LIKE_HANDLER":
      return {
        ...state,
        allPosts: state.allPosts.map((post) => {
          if (post._id === action.payload.postId) {
            if (post.likedBy.includes(action.payload.likedBy)) {
              return {
                ...post,
                likedBy: post.likedBy.filter(
                  (user) => user !== action.payload.likedBy
                ),
              };
            } else {
              return {
                ...post,
                likedBy: [...post.likedBy, action.payload.likedBy],
              };
            }
          }
          return post;
        }),
      };
    case "ENABLE_POST_MENU":
      return {
        ...state,
        postMenu: action.payload !== state.postId ? true : !state.postMenu,
        postId: action.payload,
      };
    case "ENABLE_POST_EDIT":
      const getPostForEditing = state.allPosts.find(
        (post) => post._id === action.payload
      );
      return {
        ...state,
        createPost: {
          ...state.createPost,
          enabled: true,
          createPostContent: getPostForEditing.content,
          createPostImage: getPostForEditing.image,
        },
        postMenu: false,
        postId: action.payload,
        editPost: true,
      };
    case "EDIT_POST_HANDLER":
      console.log(action.payload, "pay");
      return {
        ...state,
        allPosts: state.allPosts.map((post) => {
          if (action.payload.postId === post._id) {
            console.log(Object.assign(post, action.payload.data), "q");
            return Object.assign(post, action.payload.data);
          } else {
            return post;
          }
        }),
        editPost: false,
        postId: "",
        createPost: {
          ...state.createPost,
          loading: false,
          enabled: false,
          createPostContent: "",
          createPostImage: "",
        },
      };
    case "CLEAR_IMAGE":
      return {
        ...state,
        createPost: {
          ...state.createPost,
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
