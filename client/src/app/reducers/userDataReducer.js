const userDataReducers = (state = {
    userData: null
}, action) => {
    switch(action.type) {
        case "SAVE_USER_DATA":
            state = {
                ...state,
                userData: action.payload
            };
            break;
        case "SAVE_CHAT_LIST":
            let userData = {
                ...state.userData,
                chatList: action.payload
            };
            state = {
                ...state,
                userData: userData
            }
    }
    return state;
};

export default userDataReducers;
