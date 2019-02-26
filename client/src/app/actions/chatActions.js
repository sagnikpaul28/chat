export function onChatSelect(username, name, imageUrl) {
    return {
        type: 'SELECTED_CHAT',
        payload: {
            username: username,
            image: imageUrl,
            name: name
        }
    }
}

export function saveChatMessages(chat) {
    return {
        type: "SAVE_CHAT_MESSAGES",
        payload: chat
    }
}
