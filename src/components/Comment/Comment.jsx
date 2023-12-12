import useAuthContext from "../../contexts/AuthContext";
import useFollowContext from "../../contexts/FollowContext"
import { useIconContext } from "../../contexts/IconContext";
import useUserFeedContext from "../../contexts/UserFeedContext";
import "./Comment.css"
export default function Comment(){
    const {infinityUsers,deleteComment} = useFollowContext();
    const {userFeed} = useUserFeedContext();
    const {user} = useAuthContext();
    const {AiOutlineDelete}  =useIconContext();
    return(<div className="">
        {
            infinityUsers.comments.filter(({postId})=>postId === userFeed.selectedPostData[0]._id).map((details)=>{
                const {comment,commentBy} = details;
                return(<div className="comment-container b" key={comment}> 
                <div className="comment-header">
                  <div className="commentBy">
                    <span className="circle">
                      <img src={infinityUsers?.allUsers?.find(({username}) => username === commentBy)?.profileIcon} width="100%" height="100%" alt="Profile Icon" />
                    </span>
                    <div className="name">
                      <p>{infinityUsers?.allUsers?.find(({username}) => username === commentBy)?.firstName} {infinityUsers?.allUsers?.find(({username}) => username === commentBy)?.lastName}</p>
                      <p className="username">@{commentBy}</p>
                    </div>
                  </div>
                  {commentBy === user.name &&
                    <AiOutlineDelete size="2em" onClick={()=>deleteComment(comment)} />
                  }
                </div>
                <p className="comment">{comment}</p>  
              </div>
              )
            })
        }
    </div>)
}