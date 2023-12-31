import { useEffect } from "react";
import "../../App.css";
import "./FetchData.css";
import useUserFeedContext from "../../contexts/UserFeedContext";
import { useIconContext } from "../../contexts/IconContext";

export default function FetchData() {
  const {
    fetchAllPosts,
    userFeed,
    postLikeHandler,
    enablePostMenu,
    enableEdit,
    deletePost,
    postBookMarkHandler,
  } = useUserFeedContext();
  const {
    AiOutlineLike,
    FiBookmark,
    GoComment,
    BsThreeDotsVertical,
    MdOutlineClose,
  } = useIconContext();
  const loggedInUser = localStorage.getItem("username");

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const content = userFeed.page === "" ? "allPosts" : userFeed.page;
  return (
    <div>
      {userFeed[content]?.map((post) => {
        return (
          <div key={post._id} className="post b br">
            <div className="post-header b">
              <div className="header-row">
                <div className="icon-username">
                  <div className="user-icon b br"></div>
                  <div>
                    <p>{`${post.user.firstname} ${post.user.lastname}`}</p>
                    <p className="username">@{post.user.username}</p>
                  </div>
                </div>
                <div>
                  <BsThreeDotsVertical
                    size="2em"
                    onClick={() => enablePostMenu(post._id)}
                  />
                </div>
                {userFeed.postMenu && userFeed.postId === post._id && (
                  <div className="postMenu b">
                    <p onClick={() => enableEdit(post._id)}>Edit</p>
                    <p onClick={() => deletePost(post._id)}>Delete</p>
                  </div>
                )}
              </div>

              <div className="content">
                <p>{post.content}</p>
              </div>
            </div>
            {post.image !== "" && (
              <div className="post-body-image">
                <img src={post.image} width="100%" height="100%" />
              </div>
            )}
            <div className="post-footer b">
              <div className="icons">
                <p>{post.likedBy.length}</p>
                <AiOutlineLike
                  size="2em"
                  color={
                    post.likedBy.includes(loggedInUser) ? "blueviolet" : "white"
                  }
                  onClick={() => postLikeHandler(post._id, loggedInUser)}
                />
                <span>Like</span>
              </div>
              <div className="icons">
                <GoComment size="2em" />
                <span>Comment</span>
              </div>
              <div className="icons">
                <FiBookmark
                  size="2em"
                  color={
                    userFeed.bookmarks.find((data) => data._id === post._id)
                      ? "blueviolet"
                      : "white"
                  }
                  onClick={() => postBookMarkHandler(post._id)}
                />
                <span>Bookmark</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
