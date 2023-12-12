import FetchData from "../../components/FetchData/FetchData";
import Footer from "../../components/Footer/Footer";
import { useIconContext } from "../../contexts/IconContext";
import { BiArrowBack } from "react-icons/bi"
import "./BookMark.css"
import useUserFeedContext from "../../contexts/UserFeedContext";
import Heading from "../../components/Header/Heading";

export default function BookMark() {
    const { goToHome } = useIconContext();
    const { userFeed } = useUserFeedContext();
    return (<div>
        <div className="bookMark-header">
            <BiArrowBack size="1.7em" onClick={goToHome} />
            <h2>BookMark</h2>
        </div>
        <div className="header-div">
            <Heading />
        </div>
        <div className="container-body">        {userFeed.bookMarkView.length > 0 ?
            <FetchData />
            : <div className="parent-container-bookmark">
                <p>There are no posts currently bookmarked.</p>
            </div>}
        </div>
        <div className="footer-div">
            <Footer />
        </div>
    </div >)
}
