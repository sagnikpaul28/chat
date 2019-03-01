const dashboardReducers = (state = {
    chatList: null,
    chatListHTML: null,
    exceptChatList: null,
    exceptChatListHTML: null,
    updateList: false
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
        case "SET_ONLINE_STATUS":
            console.log("E");
            let usernameOnlineList = action.payload.list;
            let tempChatList = state.chatList;
            let tempExceptChatList = state.exceptChatList;
            if (tempChatList) {
                for (let i = 0; i < tempChatList.length; i++ ) {
                    for (let j = 0; j < usernameOnlineList.length; j++ ) {
                        if (tempChatList[i].username === usernameOnlineList[j] ) {
                            tempChatList[i].status = "online";
                        }else {
                            tempChatList[i].status = "offline";
                        }
                    }
                }
            }
            if (tempExceptChatList) {
                for (let i = 0; i < tempExceptChatList.length; i++ ) {
                    for (let j = 0; j < usernameOnlineList.length; j++ ) {
                        if (tempExceptChatList[i].username === usernameOnlineList[j] ) {
                            tempExceptChatList[i].status = "online";
                        }else {
                            tempExceptChatList[i].status = "offline";
                        }
                    }
                }
            }
            state = {
                ...state,
                chatList: tempChatList,
                exceptChatList: tempExceptChatList,
                updateList: !state.updateList
            };
            break;
    }
    return state;
};

export default dashboardReducers;
