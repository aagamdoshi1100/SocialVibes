export const InitialValueUserProfile={
    isEditProfile:false,
    bioValue:"",
    portfolioURL:"",
    avatarValue:"",
    userProfileData :[]
}

export const UserProfileReducer =(state,action)=>{
    switch(action.type){
        case "USER_PROFILE":
            return {...state,userProfileData:[action.payload.userData]}
        case "EDIT_PROFILE":
            return {...state, isEditProfile: !action.payload}
        case "BIO_VALUE":
            return {...state, bioValue: action.payload}
        case "PORTFOLIO_VALUE":
            return {...state, portfolioURL:action.payload}     
        case "AVTAR_VALUE":
            return {...state, avatarValue : action.payload}
        case "UPDATE_USER_PROFILE":
            return {...state, userProfileData:[action.payload.userData], isEditProfile:!action.payload.status}
        default:
            return {state}
    }
}