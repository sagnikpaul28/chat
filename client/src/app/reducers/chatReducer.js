const chatReducers = (state = {
    isChatSelected: false,
    selectedUsername: '',
    selectedName: '',
    selectedUsernameImage: '',
    selectedUserStatus: '',
    selectedChatList: ''
}, action) => {
    switch (action.type) {
        case "SELECTED_CHAT":
            state = {
                ...state,
                isChatSelected: true,
                selectedUsername: action.payload.username,
                selectedUsernameImage: action.payload.image,
                selectedName: action.payload.name,
                selectedUserStatus: action.payload.status
            };
            break;
        case "SAVE_CHAT_MESSAGES":
            state = {
                ...state,
                selectedChatList: action.payload
            };
            break;
        case "CHANGE_ONLINE_STATUS_OF_CHAT_USER":
            state = {
                ...state,
                selectedUserStatus: action.payload
            }
    }
    return state;
};

export default chatReducers;
