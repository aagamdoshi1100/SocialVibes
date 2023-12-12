import { useIconContext } from "../../contexts/IconContext";
import useUserFeedContext from "../../contexts/UserFeedContext"
import "./NewPost.css"

export default function NewPost() {
    const { userFeed, userFeedDispacher, createPost } = useUserFeedContext();
    const { MdInsertPhoto } = useIconContext();
    return (<div className="create-post">
        <textarea className="myText" onChange={(e) => userFeedDispacher({ type: "CREATE_POST_CONTENT", payload: e.target.value })} placeholder="Write something..." ></textarea>
        <div className="create-post-controls">
            <div className="preview-btn-icon">
                {userFeed.createPostImage === null || userFeed.createPostImage === undefined ? "" :
                    <div className="image-box" >
                        <img src={userFeed.createPostImage === null || userFeed.createPostImage === undefined ? "" : `${URL.createObjectURL(userFeed.createPostImage)}`} onClick={() => userFeedDispacher({ type: "PREVIEW", payload: userFeed.previewUploadedImage })} />
                    </div>}
                <div className="btn-imgpicker">
                    <label htmlFor="image">
                        <MdInsertPhoto size="1.9em" />
                    </label>
                    <input type="file" id="image" style={{ display: "none", visibility: "none" }} onChange={(e) => userFeedDispacher({ type: "CREATE_POST_IMAGE", payload: e.target.files[0] })} />
                    <button className="btn-post" onClick={createPost}>Create Post</button>
                </div>
            </div>
            {userFeed.previewUploadedImage ?
                <div className="preview-post b br">
                    <h3>Post preview</h3>
                    <p>{userFeed?.createPostContent}</p>
                    <img src={userFeed.createPostImage === null || userFeed.createPostImage === undefined ? "" : `${URL.createObjectURL(userFeed.createPostImage)}`} />
                    <div>
                        <button onClick={createPost}>Post</button>
                        <button onClick={() => userFeedDispacher({ type: "PREVIEW", payload: userFeed.previewUploadedImage })}>Discard</button>
                    </div>
                </div> : null
            }
        </div>
    </div>)
}