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
