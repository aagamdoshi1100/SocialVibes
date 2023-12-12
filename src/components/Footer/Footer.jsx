import "./Footer.css"
import { useIconContext } from "../../contexts/IconContext"
import useAuthContext from "../../contexts/AuthContext";
import Filters from "../Filters/Filters";
import useUserFeedContext from "../../contexts/UserFeedContext";
export default function Footer() {
    const { goToBookMark, goToHome, goToExplore, BiLogOut, BiBookBookmark, MdOutlineExplore, AiOutlineHome } = useIconContext();
    const { logOutHandler } = useAuthContext();
    const { userFeed } = useUserFeedContext()

    return (<div className="footer">
        <div className={userFeed.fetchValue === "followedUserPosts" ? "icon-details-selected" : "icon-details"} onClick={goToHome}>
            <AiOutlineHome size="2em" />
            <span className="icon-name" >Home</span>
        </div>

        <div className={userFeed.fetchValue === "postsData" ? "icon-details-selected" : "icon-details"} onClick={goToExplore}>
            <MdOutlineExplore size="2em" />
            <span className="icon-name">Explore</span>
        </div>

        <div className={userFeed.fetchValue === "bookMarkView" ? "icon-details-selected" : "icon-details"} onClick={goToBookMark}>
            <BiBookBookmark size="2em" />
            <span className="icon-name">Bookmark</span>
        </div>

        {/* <div className="icon-details fil">
            <Filters />
            <span className="Filter-icon-name icon-name" style={{ display: userFeed.showFiltersUserFeed ? "none" : "block" }}>Filter</span>
        </div> */}

        <div className="icon-details" onClick={logOutHandler}>
            <BiLogOut size="2em" />
            <span className="icon-name">Log out</span>
        </div>
    </div>)
}