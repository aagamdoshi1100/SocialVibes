import { useIconContext } from "../../contexts/IconContext";
import useUserFeedContext from "../../contexts/UserFeedContext"
import "./Filters.css"

export default function Filters() {
    const { userFeed, userFeedDispacher } = useUserFeedContext();
    const { FaFilter } = useIconContext();
    return (
        <div className="filterBox">
            <p className="heading-filterbox">{userFeed.filterBy}</p>
            <FaFilter size="1.4em" className="filterBox-icon" onClick={() => userFeedDispacher({ type: "SHOW_FILTERS", payload: userFeed.showFiltersUserFeed })} />

            {userFeed.showFiltersUserFeed ?
                <div className="filterBox-types">
                    <span onClick={() => userFeedDispacher({ type: "SORT_BY_TRENDING", payload: [...userFeed.postsData] })}>Trending</span>
                    <p onClick={() => userFeedDispacher({ type: "SORT_BY_LATEST", payload: [...userFeed.postsData] })}>Latest</p>
                    <span onClick={() => userFeedDispacher({ type: "SORT_BY_OLDEST", payload: [...userFeed.postsData] })}>Oldest</span>

                </div> : null
            }
        </div>
    )
}