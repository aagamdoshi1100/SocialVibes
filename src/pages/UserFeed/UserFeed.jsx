import useUserFeedContext from "../../contexts/UserFeedContext"
import "./UserFeed.css"
import "../../App.css"
import useFollowContext from "../../contexts/FollowContext"
import FetchData from "../../components/FetchData/FetchData"
import Footer from "../../components/Footer/Footer"
import Heading from "../../components/Header/Heading"
import Filters from "../../components/Filters/Filters"
import { useIconContext } from "../../contexts/IconContext"
import AllUsers from "../../components/AllUsers/AllUsers"
import NewPost from "../../components/NewPost/NewPost"


export default function UserFeed() {
    const { userFeed } = useUserFeedContext()
    console.log("UserFeed.jsx:15   UserFeed  userFeed:", userFeed)
    const { infinityUsers } = useFollowContext();
    const { SlUserFollow } = useIconContext();
    // console.log(" infinityUsers:", infinityUsers)

    return (<div className="container">
        <div className="header-div" style={{ display: "block" }}>
            <Heading />
        </div>
        <div className="container-body">
            <div className="create-post-div">
                <NewPost />
            </div>
            <div className="allUsers-div">
                <AllUsers />
            </div>
            {userFeed.followedUserPosts.length > 0 ?
                <div className="all-posts-div">
                    <div className="filter-icon">
                        <Filters />
                    </div>
                    <FetchData />
                </div>
                : <div className="no-post-box">
                    <SlUserFollow size="2em" />
                    <p className="no-post-message">Please follow users or upload to see posts</p>
                </div>}
        </div>
        <div className="footer-div">
            <Footer />
        </div>
    </div>)
}