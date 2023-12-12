export const InitialValueFollowContext={
    allUsers :[],
    isCommentEnabled: false,
    commentValue: "",
    PostcommentId:"",
    indexOfPost:"",
    commentBy:"",
    comments:[]
}

export const UserFollowReducer =(state,action)=>{
    switch(action.type){
        case "ALL_USERS":
            return {...state, allUsers:action.payload}
        case "ADD_NEW_USER":
            return {...state,allUsers:[...state.allUsers, action.payload]}
        case "ENABLE_COMMENT":
            return {...state,indexOfPost: action.payload.indexOfPost, isCommentEnabled : !action.payload.status }
        case "CREATE_COMMENT":
            return {...state, commentValue: action.payload.comment, PostcommentId: action.payload.Id, commentBy: action.payload.username }
        case "SAVE_COMMENT":
            return {...state, comments: [...state.comments, {postId: state.PostcommentId, comment:state.commentValue, commentBy:state.commentBy}],isCommentEnabled : !state.isCommentEnabled}
        case "DISCARD_COMMENT":
            return {...state, isCommentEnabled : !state.isCommentEnabled, commentValue: "", PostcommentId:""}
        case "DELETE_COMMENT":
            return {...state, comments: [...state.comments.filter((item)=>item.comment !== action.payload)]}
        default:
            return {state}
    }
}