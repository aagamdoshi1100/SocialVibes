import { createContext, useContext } from "react";
import useUserFeedContext from "./UserFeedContext";
import {BiArrowBack,BiLogOut,BiBookBookmark,BiLogIn,BiLink,BiGlobe,BiDotsVertical} from "react-icons/bi"
import {MdOutlineExplore,MdInsertPhoto} from "react-icons/md"
import {AiOutlineHome,AiOutlineLike,AiOutlineDelete} from "react-icons/ai"
import {FiBookmark} from "react-icons/fi"
import {GoComment} from "react-icons/go"
import {FaFilter} from "react-icons/fa"
import {SlUserFollow} from "react-icons/sl"
import {GiInfinity} from "react-icons/gi"

const IconContext = createContext();

export default function IconContextProvider({children}){
    const {navigate,userFeedDispacher} = useUserFeedContext()
    const goToBookMark =()=>{
        userFeedDispacher({type:"BOOKMARK_PAGE",payload:"bookMarkView"})
        navigate("/pages/bookmark/BookMark")
    }    
    const goToHome =()=>{
        userFeedDispacher({type:"HOME_PAGE",payload:"followedUserPosts"})
        navigate("/pages/UserFeed/UserFeed")
    }
    const goToExplore =()=>{
        userFeedDispacher({type:"EXPLORE_PAGE",payload:"postsData"})
        navigate('/pages/explore/Explore')
        }
    return(<IconContext.Provider value={{goToBookMark,goToHome,goToExplore,BiArrowBack,BiLogOut,BiBookBookmark,MdOutlineExplore,AiOutlineHome,BiLogIn,BiLink,BiGlobe,BiDotsVertical,MdInsertPhoto,AiOutlineLike,FiBookmark,GoComment,FaFilter,SlUserFollow,AiOutlineDelete,GiInfinity}}>{children}</IconContext.Provider>)
}

export const useIconContext =()=>useContext(IconContext)
