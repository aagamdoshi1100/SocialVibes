import useUserFeedContext from "../../contexts/UserFeedContext";
import useAuthContext from "../../contexts/AuthContext";
import "../../App.css";
import "./FetchData.css";
import useFollowContext from "../../contexts/FollowContext";
import { useUserProfileContext } from "../../contexts/UserProfileContext";
import { useIconContext } from "../../contexts/IconContext";
export default function FetchData() {
  const {
    userFeed,
    userFeedDispacher,
    postLikeHandler,
    deletePostHandler,
    getSelectedPost,
    editHandler,
    postBookMarkHandler,
  } = useUserFeedContext();

  const { user } = useAuthContext();
  const { infinityUsers, followUser, infinityUsersDispacher, handleComment } =
    useFollowContext();
  console.log("infinityUsers:", infinityUsers);
  const {
    GoComment,
    FiBookmark,
    BiDotsVertical,
    MdInsertPhoto,
    AiOutlineLike,
  } = useIconContext();
  const { getUserProfile, profile } = useUserProfileContext();

  const fetchValue = userFeed?.fetchValue;
  return (<div>
    <div className="container-fetchData">
      {userFeed?.[fetchValue]?.map((details) => {
        const { _id, username, content, image, createdAt, likes } = details;
        return (
          <div key={_id} className="FeedBox b">
            <div className="post-header">
              <div className="user-identity">
                <span
                  className="circle"
                  onClick={() =>
                    getUserProfile(
                      infinityUsers?.allUsers?.find(
                        (item) => item.username === username
                      )._id,
                      username
                    )
                  }
                >
                  <img
                    src={
                      username === user.name && profile.userProfileData.length > 0
                        ? profile.userProfileData[0]?.profileIcon
                        : infinityUsers?.allUsers?.find(
                          (item) => item.username === username
                        )?.profileIcon
                    }
                    width="100%"
                    height="100%"
                    alt="Profile Icon"
                  />
                </span>
                <div className="fullName">
                  <span>{`${infinityUsers?.allUsers?.find(
                    (item) => item.username === username
                  )?.firstName
                    } ${infinityUsers?.allUsers?.find(
                      (item) => item.username === username
                    )?.lastName
                    }`}</span>
                  <span style={{ color: "grey" }}>@{username}</span>
                </div>
                <span style={{ color: "rgb(184, 179, 179)" }}>{createdAt}</span>
              </div>
              <div className="post-edit-btn">
                <BiDotsVertical
                  size="1.8em"
                  onClick={() =>
                    userFeedDispacher({
                      type: "THREE_DOT_CONTROLLER",
                      payload: { indexOfPost: _id },
                    })
                  }
                  className="three-dots b"
                />

                {(userFeed.indexOfPost === _id) & (username === user.name) ? (
                  <div className="heading-menu-item">
                    <li
                      onClick={() =>
                        userFeedDispacher({
                          type: "EDIT_CONTROLLER",
                          payload: userFeed.showEditUserFeed,
                        })
                      }
                    >
                      Edit
                    </li>
                    <li onClick={() => deletePostHandler(_id)}>Delete</li>
                  </div>
                ) : null}

                {userFeed?.followedUsers?.find((item) => item === username) ? (
                  userFeed.indexOfPost === _id &&
                    username !== user.name &&
                    userFeed?.followedUsers?.find((item) => item === username) ? (
                    <li
                      className="heading-menu-item"
                      onClick={() =>
                        followUser(
                          infinityUsers?.allUsers?.find(
                            (item) => item.username === username
                          )._id
                        )
                      }
                    >
                      Unfollow
                    </li>
                  ) : null
                ) : userFeed.indexOfPost === _id &&
                  username !== user.name &&
                  userFeed?.followedUsers?.find((item) => item !== username) ? (
                  <li
                    className="heading-menu-item"
                    onClick={() =>
                      followUser(
                        infinityUsers?.allUsers?.find(
                          (item) => item.username === username
                        )._id
                      )
                    }
                  >
                    Follow
                  </li>
                ) : null}
              </div>
            </div>

            <div>{userFeed.showEditUserFeed && userFeed.indexOfPost === _id && user.name === username ?
              <div className="post-editBox">
                <h3 >Edit Post</h3>
                <textarea className="myText"
                  onChange={(e) =>
                    userFeedDispacher({
                      type: "CREATE_POST_CONTENT",
                      payload: e.target.value,
                    })
                  }
                />
                <label htmlFor="image">
                  <MdInsertPhoto size="2em" />
                </label>
                <input
                  type="file"
                  id="image"
                  style={{ display: "none", visibility: "none" }}
                  onChange={(e) =>
                    userFeedDispacher({
                      type: "CREATE_POST_IMAGE",
                      payload: e.target.files[0],
                    })
                  }
                />
                <div>
                  <button onClick={() => editHandler(_id)} className="btn-post">
                    Save
                  </button>
                  <button onClick={() =>
                    userFeedDispacher({
                      type: "EDIT_CONTROLLER",
                      payload: userFeed.showEditUserFeed,
                    })
                  } className="btn-post ml-2">
                    Discard
                  </button>
                </div>
              </div> : null
            }
              <p style={{ margin: "10px" }}>{content}</p>
              {!image ? null : (
                <div className="fetchdata-image" onClick={() => getSelectedPost(_id)}>
                  <img src={`${image}`} width="100%" height="100%" alt="post" />
                </div>
              )}
            </div>


            <div className="post-footer">
              <div className="footer-icon" onClick={() => postLikeHandler(_id)}>
                <AiOutlineLike
                  size="1em"
                  color={
                    likes?.likedBy?.some(
                      (postLikedBy) => postLikedBy.username === user.name
                    )
                      ? "red"
                      : "white"
                  }

                />
                <span>{likes?.likeCount}
                </span>
              </div>
              <div className="footer-icon" onClick={() =>
                infinityUsersDispacher({
                  type: "ENABLE_COMMENT",
                  payload: {
                    indexOfPost: _id,
                    status: infinityUsers.isCommentEnabled,
                  },
                })
              }>
                <GoComment
                  size="1em"

                />
                <span>
                  {
                    infinityUsers.comments.filter(({ postId }) => _id === postId)
                      .length
                  }
                </span>
              </div>
              {infinityUsers.indexOfPost === _id &&
                infinityUsers.isCommentEnabled ? (
                <div className="comment-box b">
                  <textarea
                    className="myText"
                    onChange={(e) =>
                      infinityUsersDispacher({
                        type: "CREATE_COMMENT",
                        payload: {
                          comment: e.target.value,
                          Id: _id,
                          username: user.name,
                        },
                      })
                    }
                    placeholder="Write something..."
                  ></textarea>
                  <button
                    onClick={() =>
                      infinityUsersDispacher({ type: "DISCARD_COMMENT" })
                    }
                  >
                    Discard
                  </button>
                  <button onClick={handleComment}>Post</button>
                </div>
              ) : null}
              <div className="footer-icon">
                <FiBookmark
                  size="1em"
                  color={
                    userFeed.bookMarkView.some(
                      (item) => item.username === username
                    )
                      ? "blueviolet"
                      : "white"
                  }
                  onClick={() => postBookMarkHandler(_id)}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>);
}
