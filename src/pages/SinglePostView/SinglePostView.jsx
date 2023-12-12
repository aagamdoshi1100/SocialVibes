import FetchData from "../../components/FetchData/FetchData";
import Footer from "../../components/Footer/Footer";
import { useIconContext } from "../../contexts/IconContext";
import Comment from "../../components/Comment/Comment";
import "./SinglePostView.css"
import Heading from "../../components/Header/Heading";

export default function SinglePostView() {
    const { goToHome, BiArrowBack } = useIconContext();

    return (<div>
        <div className="selected-post-header">
            <BiArrowBack size="1.7em" onClick={goToHome} />
            <h2>View Post</h2>
        </div>
        <div className="header-div">
            <Heading />
        </div>
        <div className="container-body">
            <div className="post-view-container">
                <FetchData />
            </div>
            <div style={{ marginBottom: "80px" }}>
                <Comment />
            </div>
        </div>
        <div className="footer-div">
            <Footer />
        </div>
    </div>)
}

