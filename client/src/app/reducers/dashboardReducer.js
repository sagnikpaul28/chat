const dashboardReducers = (state = {
    chatList: null,
    chatListHTML: null,
    exceptChatList: null,
    exceptChatListHTML: null
}, action) => {
    switch (action.type) {
        case "SAVE_CHAT_LIST":
            state = {
                ...state,
                chatList: action.payload
            };
            break;
        case "SAVE_CHAT_LIST_HTML":
            state = {
                ...state,
                chatListHTML: action.payload
            };
            break;
        case "SAVE_EXCEPT_CHAT_LIST":
            state = {
                ...state,
                exceptChatList: action.payload
            };
            break;
        case "SAVE_EXCEPT_CHAT_LIST_HTML":
            state = {
                ...state,
                exceptChatListHTML: action.payload
            };
            break;
    }
    return state;
};

export default dashboardReducers;
