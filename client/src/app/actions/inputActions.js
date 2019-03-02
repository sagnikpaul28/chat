export function homeLoginInputChange(fieldName, value) {
    if (fieldName === 'username') {
        return {
            type: "HOME_USERNAME_CHANGE",
            payload: value
        }
    }else if (fieldName === 'password') {
        return {
            type: "HOME_PASSWORD_CHANGE",
            payload: value
        }
    }
}

export function homeLoginLabelChange(labelName, status) {
    if (labelName === 'homeUsernameLabelClass') {
        return {
            type: 'HOME_USERNAME_LABEL_CHANGE',
            payload: status
        }
    }else if (labelName === 'homePasswordLabelClass') {
        return {
            type: 'HOME_PASSWORD_LABEL_CHANGE',
            payload: status
        }
    }
}

export function signUpInputChange(fieldName, value) {
    if (fieldName === 'username') {
        return {
            type: 'SIGN_UP_USERNAME_CHANGE',
            payload: value
        }
    } else if (fieldName === 'name') {
        return {
            type: 'SIGN_UP_NAME_CHANGE',
            payload: value
        }
    } else if (fieldName === 'email') {
        return {
            type: 'SIGN_UP_EMAIL_CHANGE',
            payload: value
        }
    } else if (fieldName === 'number') {
        return {
            type: 'SIGN_UP_NUMBER_CHANGE',
            payload: value
        }
    } else if (fieldName === 'password') {
        return {
            type: 'SIGN_UP_PASSWORD_CHANGE',
            payload: value
        }
    } else if (fieldName === 'confirmPassword') {
        return {
            type: 'SIGN_UP_CONFIRM_PASSWORD_CHANGE',
            payload: value
        }
    }
}

export function signUpLabelChange(fieldName, value) {
    if (fieldName === 'username') {
        return {
            type: 'SIGN_UP_USERNAME_LABEL_CHANGE',
            payload: value
        }
    } else if (fieldName === 'name') {
        return {
            type: 'SIGN_UP_NAME_LABEL_CHANGE',
            payload: value
        }
    } else if (fieldName === 'email') {
        return {
            type: 'SIGN_UP_EMAIL_LABEL_CHANGE',
            payload: value
        }
    } else if (fieldName === 'number') {
        return {
            type: 'SIGN_UP_NUMBER_LABEL_CHANGE',
            payload: value
        }
    } else if (fieldName === 'password') {
        return {
            type: 'SIGN_UP_PASSWORD_LABEL_CHANGE',
            payload: value
        }
    } else if (fieldName === 'confirmPassword') {
        return {
            type: 'SIGN_UP_CONFIRM_PASSWORD_LABEL_CHANGE',
            payload: value
        }
    }
}

export function setSignUpErrorMessage(message) {
    return {
        type: "SIGN_UP_ERROR_MESSAGE_CHANGE",
        payload: message
    }
}

export function clearSignUpData() {
    return {
        type: 'SIGN_UP_INPUT_CLEAR'
    }
}

export function changeChatMessage(message) {
    return {
        type: 'CHAT_MESSAGE_CHANGE',
        payload: message
    }
}

export function changeContactSearch(value) {
    return {
        type: 'CONTACT_SEARCH_CHANGE',
        payload: value
    }
}
