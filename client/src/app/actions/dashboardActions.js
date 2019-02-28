export function saveChatList(data) {
    return {
        type: 'SAVE_CHAT_LIST',
        payload: data
    }
}

export function saveChatListHTML(data) {
    return {
        type: 'SAVE_CHAT_LIST_HTML',
        payload: data
    }
}

export function saveExceptChatList(data) {
    return {
        type: 'SAVE_EXCEPT_CHAT_LIST',
        payload: data
    }
}

export function saveExceptChatListHTML(data) {
    return {
        type: 'SAVE_EXCEPT_CHAT_LIST_HTML',
        payload: data
    }
}

export function setOnlineStatus(usernameList) {
    return {
        type: 'SET_ONLINE_STATUS',
        payload:  usernameList
    }
}
