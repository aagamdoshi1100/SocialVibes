import FetchData from "../../components/FetchData/FetchData";
import Footer from "../../components/Footer/Footer";
import useAuthContext from "../../contexts/AuthContext";
import useFollowContext from "../../contexts/FollowContext";
import useUserFeedContext from "../../contexts/UserFeedContext";
import "./UserProfile.css"
import { useUserProfileContext } from "../../contexts/UserProfileContext";
import { useIconContext } from "../../contexts/IconContext";
import Heading from "../../components/Header/Heading";

export default function UserProfile() {
    const { userFeed, userFeedDispacher, navigate } = useUserFeedContext();
    const { infinityUsers, followUser } = useFollowContext();
    const { profile, editUserProfile, profileDispacher } = useUserProfileContext();
    const { BiArrowBack, BiLink, BiGlobe } = useIconContext();
    console.log("🚀 ~ file: UserProfile.jsx:14 ~ UserProfile ~ profile:", profile)
    const { user } = useAuthContext()
    const goToHome = () => {
        userFeedDispacher({ type: "ALL_POSTS", payload: { data: userFeed.postsData, value: "postsData" } })
        navigate("/")
    }
    return (<div>
        <h2 className="profile-arrow">
            <span>
                <BiArrowBack onClick={goToHome} />
            </span>
            User Profile Page
        </h2>
        <div className="header-div">
            <Heading />
        </div>

        {
            profile?.userProfileData?.map((details) => {
                const { following, followers, username, profileIcon, lastName, firstName, _id, bio, portfolio } = details;
                return (<div key={_id} className="container-body b">
                    <div className="profile-header">
                        <div className="profile-circle" >
                            <img src={`${profileIcon}`} alt="Profile Icon" />
                        </div>
                        <div className="following">
                            <p>{following.length}</p>
                            <p>Following </p>
                        </div>
                        <div className="followers">
                            <p>{followers.length}</p>
                            <p>Followers </p>
                        </div>
                    </div>
                    <div className="profile-header-icon-username">
                        <span>{`${firstName} ${lastName}`}</span>
                    </div>
                    <div className="bio-portfolio">
                        <p><span><BiGlobe /></span>{bio === "" ? `Hey there, ${firstName} ${lastName}` : bio}</p>
                        <p><span><BiLink /></span>{portfolio === "" ? `https://github.com/${firstName}${lastName}` :
                            <a className="url-link" href={portfolio}>{portfolio}</a>}</p >
                    </div>
                    <div>
                        {user.name === username ?
                            <div className="Btn-div">
                                <button className="Btn" onClick={() => profileDispacher({ type: "EDIT_PROFILE", payload: profile.isEditProfile })}>Edit</button>
                            </div> : null
                        }
                        {profile.isEditProfile ?
                            <div className="edit-profile-div b">
                                <input className="edit-profile-inputs" type="text" placeholder="Enter your bio" onChange={(e) => profileDispacher({ type: "BIO_VALUE", payload: e.target.value })} />
                                <input className="edit-profile-inputs" type="text" placeholder="Enter your portfolio URL" onChange={(e) => profileDispacher({ type: "PORTFOLIO_VALUE", payload: e.target.value })} />
                                <div className="avtars">
                                    <img className="selectAvtar" src="https://shorturl.at/ctGQZ" onClick={(e) => profileDispacher({ type: "AVTAR_VALUE", payload: e.target.src })} alt="Select Profile Icon" />
                                    <img className="selectAvtar" src="https://shorturl.at/dkyER" onClick={(e) => profileDispacher({ type: "AVTAR_VALUE", payload: e.target.src })} alt="Select Profile Icon" />
                                    <img className="selectAvtar" src="https://shorturl.at/hpsuR" onClick={(e) => profileDispacher({ type: "AVTAR_VALUE", payload: e.target.src })} alt="Select Profile Icon" />
                                    <img className="selectAvtar" src="https://shorturl.at/bpvC9" onClick={(e) => profileDispacher({ type: "AVTAR_VALUE", payload: e.target.src })} alt="Select Profile Icon" />
                                    <img className="selectAvtar" src="https://shorturl.at/jpX57" onClick={(e) => profileDispacher({ type: "AVTAR_VALUE", payload: e.target.src })} alt="Select Profile Icon" />
                                    <img className="selectAvtar" src="https://shorturl.at/qENP1" onClick={(e) => profileDispacher({ type: "AVTAR_VALUE", payload: e.target.src })} alt="Select Profile Icon" />
                                    <img className="selectAvtar" src="https://shorturl.at/hjGK4" onClick={(e) => profileDispacher({ type: "AVTAR_VALUE", payload: e.target.src })} alt="Select Profile Icon" />
                                </div>
                                <button className="edit-profile-btn" onClick={editUserProfile}>Save</button>
                                <button className="edit-profile-btn" onClick={() => profileDispacher({ type: "EDIT_PROFILE", payload: profile.isEditProfile })}>Cancel</button>
                            </div> : null
                        }
                        <div className="Btn-div">
                            {user.name === username ? null :
                                userFeed?.followedUsers.find((item) => item === username) ?
                                    <button className="Btn" onClick={() => followUser(_id)}>UnFollow</button> :
                                    <button className="Btn" onClick={() => followUser(_id)}>Follow</button>
                            }
                        </div>

                        <FetchData />
                    </div>
                    <div className="footer-div">
                        <Footer />
                    </div>
                </div>)
            })

        }
    </div >)
}