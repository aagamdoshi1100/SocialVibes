import FetchData from "../../components/FetchData/FetchData";
import Footer from "../../components/Footer/Footer";
import { useIconContext } from "../../contexts/IconContext";
import AllUsers from "../../components/AllUsers/AllUsers"
import "./Explore.css"
import "../UserFeed/UserFeed.css"
import Heading from "../../components/Header/Heading";

export default function Explore() {
    const { goToHome, BiArrowBack } = useIconContext()
    return (<div>
        <div className="explore-header">
            <BiArrowBack size="1.7em" onClick={goToHome} />
            <h2>Explore</h2>
        </div>
        <div className="header-div">
            <Heading />
        </div>
        <div className="container-body">
            <div className="allUsers-div">
                <AllUsers />
            </div>
            <FetchData />
        </div>
        <div className="footer-div">
            <Footer />
        </div>
    </div>)
}