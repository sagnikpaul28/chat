export function saveUserData(data) {
    return {
        type: 'SAVE_USER_DATA',
        payload: data
    }
}

export function saveChatList(data) {
    return {
        type: "SAVE_CHAT_LIST",
        payload: data
    }
}
