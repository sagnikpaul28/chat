const chatReducers = (state = {
    isChatSelected: false,
    selectedUsername: '',
    selectedName: '',
    selectedUsernameImage: '',
    selectedChatList: ''
}, action) => {
    switch (action.type) {
        case "SELECTED_CHAT":
            state = {
                ...state,
                isChatSelected: true,
                selectedUsername: action.payload.username,
                selectedUsernameImage: action.payload.image,
                selectedName: action.payload.name
            };
            break;
        case "SAVE_CHAT_MESSAGES":
            state = {
                ...state,
                selectedChatList: action.payload
            };
            break;
    }
    return state;
};

export default chatReducers;
