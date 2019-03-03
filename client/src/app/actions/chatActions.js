export function onChatSelect(username, name, imageUrl, status) {
    return {
        type: 'SELECTED_CHAT',
        payload: {
            username: username,
            image: imageUrl,
            name: name,
            status: status
        }
    }
}

export function saveChatMessages(chat) {
    return {
        type: "SAVE_CHAT_MESSAGES",
        payload: chat
    }
}

export function setOnlineStatusOfSelectedUsername(status) {
    return {
        type: "CHANGE_ONLINE_STATUS_OF_CHAT_USER",
        payload: status
    }
}
