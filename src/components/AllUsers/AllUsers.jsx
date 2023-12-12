import useAuthContext from "../../contexts/AuthContext";
import useFollowContext from "../../contexts/FollowContext";
import useUserFeedContext from "../../contexts/UserFeedContext";
import "./AllUsers.css"

export default function AllUsers() {
    const { infinityUsers, followUser } = useFollowContext();
    const { userFeed } = useUserFeedContext();
    const { user } = useAuthContext();
    return (<div className="allUsers">
        {infinityUsers?.allUsers.filter(({ username }) => username !== user.name).map((details) => {
            const { _id, profileIcon, firstName, lastName, username } = details;
            return (<div className="userBox" key={_id}>
                <div className="user-details">
                    <span className="circle"><img src={profileIcon} width="100%" height="100%" alt="Profile Icon" /></span>
                    <div style={{ marginLeft: "5px" }}>
                        <h4>{`${firstName} ${lastName}`}</h4>
                        <p className="username">{`@${username}`}</p>
                    </div>
                </div>
                {
                    userFeed?.followedUsers.find((item) => item === username) ? <button className="btn-userbox" onClick={() => followUser(_id)}>Unfollow</button> : <button className="btn-userbox" onClick={() => followUser(_id)}>Follow</button>
                }
            </div>)
        })}
    </div>)
}