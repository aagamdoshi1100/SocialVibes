import useAuthContext from "../../contexts/AuthContext"
import useFollowContext from "../../contexts/FollowContext";
import "./Avtar.css"

export default function Avtar(){
    const {user,setUser,navigate} = useAuthContext();
    const {infinityUsersDispacher} = useFollowContext();
    console.log("🚀 ~ file: Avtar.js:6 ~ Avtar ~ user:", user)

    const addNewUser =()=>{
        if(user.isNewUser){
        infinityUsersDispacher({type:"ADD_NEW_USER",payload:user.newUser});
        setUser({...user,isNewUser: !user.isNewUser});
        navigate("/pages/UserFeed/UserFeed");
        }
    }
    return(<div className="avtar-container">
        <div className="child-container">
            <div className="avtar-header">
                <h1>Select Avtar</h1>
                    <div className="avtar-circle" >
                        <img className="selectedAvtar" src={`${user.newUser?.profileIcon}`} alt="Profile Icon" />
                    </div>
                <h3>{user.newUser?.firstName}{" "}{user.newUser?.lastName}</h3>
            </div>
            <div className="avtars">
                <img className="selectAvtar" src="https://shorturl.at/ctGQZ" onClick={(e)=>setUser({...user, newUser : {...user.newUser , profileIcon: e.target.src}})} alt="Select Profile Icon"/>
                <img className="selectAvtar" src="https://shorturl.at/dkyER" onClick={(e)=>setUser({...user, newUser : {...user.newUser , profileIcon: e.target.src}})} alt="Select Profile Icon"/>
                <img className="selectAvtar" src="https://shorturl.at/hpsuR" onClick={(e)=>setUser({...user, newUser : {...user.newUser , profileIcon: e.target.src}})} alt="Select Profile Icon"/>
                <img className="selectAvtar" src="https://shorturl.at/bpvC9" onClick={(e)=>setUser({...user, newUser : {...user.newUser , profileIcon: e.target.src}})} alt="Select Profile Icon"/>
                <img className="selectAvtar" src="https://shorturl.at/jpX57" onClick={(e)=>setUser({...user, newUser : {...user.newUser , profileIcon: e.target.src}})} alt="Select Profile Icon"/>
                <img className="selectAvtar" src="https://shorturl.at/qENP1" onClick={(e)=>setUser({...user, newUser : {...user.newUser , profileIcon: e.target.src}})} alt="Select Profile Icon"/>
                <img className="selectAvtar" src="https://shorturl.at/hjGK4" onClick={(e)=>setUser({...user, newUser : {...user.newUser , profileIcon: e.target.src}})} alt="Select Profile Icon"/>
            </div>
        <button className="homebtn" onClick={addNewUser}>Go To Home</button></div>
    </div>)
}
