import { useIconContext } from "../../contexts/IconContext";
import useUserFeedContext from "../../contexts/UserFeedContext";
import Loader from "react-js-loader";
import "./NewPost.css";

export default function NewPost() {
  const { userFeed, userFeedDispacher, createPost } = useUserFeedContext();
  const { BiImageAdd } = useIconContext();
  const hide = {
    display: "none",
    visibility: "none",
  };
  const show = {
    display: "block",
    visibility: "visible",
  };
  const base64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      userFeedDispacher({
        type: "CREATE_POST_IMAGE",
        payload: reader.result,
      });
    };
  };

  return (
    <div
      className="create-post"
      style={userFeed.createPost.enabled ? show : hide}
    >
      {userFeed.createPost.loading ? (
        <div className={"row"}>
          <div className={"item"}>
            <Loader
              type="spinner-default"
              bgColor="rgba(88, 88, 88, 0.2)"
              color="rgba(88, 88, 88, 0.2)"
              title={"Uploading post"}
              size={100}
            />
          </div>
        </div>
      ) : (
        <div className="new-post-container">
          <div>
            {userFeed.createPost.createPostImage === "" ? (
              <>
                <label htmlFor="image">
                  <div className="image-upload-icon-div">
                    <BiImageAdd size="5em" />
                  </div>
                </label>
                <input
                  type="file"
                  id="image"
                  style={hide}
                  onChange={(e) => base64(e.target.files[0])}
                />
              </>
            ) : (
              <img
                src={userFeed.createPost.createPostImage}
                width="100%"
                className="uploaded-img"
              />
            )}
          </div>
          <textarea
            className="create-post-content-box"
            value={userFeed.createPost.createPostContent}
            rows="2"
            onChange={(e) =>
              userFeedDispacher({
                type: "CREATE_POST_CONTENT",
                payload: e.target.value,
              })
            }
            placeholder="Write something..."
          ></textarea>
          <div className="multiple-btns">
            <button
              className="discard"
              onClick={() =>
                userFeedDispacher({
                  type: "DISCARD_POST_CREATION",
                })
              }
            >
              Discard
            </button>
            <button className="post" onClick={createPost}>
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
